import express, {Request, Response, Router} from "express";
import messages from "../../../config/Messages";
import {DatabaseObject, DBResponse} from "../../../interface/Database";
import {Customer} from "../../../models/Customer";
import Constants from "../../../config/Constants";
import bcrypt from "bcryptjs";
import {User} from "../../../interface/User";
import {Admin} from "../../../models/Admin";

const router: Router = express.Router();

//  @route  GET api/users/auth/register
//  @decs   post for customer registration
//  @access Public
router.post("/register", async (req: Request, res: Response) => {
	const {_username, _password, _address, _name, _lastName}: Record<string, string> = req.body;
	if(!_username || !_password){
	    res.status(422).json({...messages.wrongInput, message: "Username or password is not provided"});
	    return;
	}if(!new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})").test(_password)){
		res.status(422).json(
		    {...messages.wrongInput, message: "Password must be at least 8 characters containing alphabet ant numbers"}
		);
		return;
	}if(!new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:" +
        "\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:" +
        "[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\" +
        "[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|" +
        "\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|" +
        "[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:" +
        "[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])").test(_username)){
		res.status(422).json(
			{...messages.wrongInput, message: "Incorrect email"}
		);
		return;
	}if(!new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})").test(_password)){
		res.status(422).json(
			{...messages.wrongInput, message: "Password must be at least 8 characters containing alphabet ant numbers"}
		);
		return;
	}if(_username.length > 255 || _password.length > 255
        || (_address &&( _address.length > 1000 || _address.length < 6))
        || (_name && (_name.length > 255 || _name.length < 6))
        || (_lastName && (_lastName.length > 255 || _lastName.length < 6))){
		res.status(422).json(
			{...messages.wrongInput, message: "Incorrect message length"}
		);
		return;
	}
	const checkUser: DBResponse = await new Customer(Constants.UNKNOWN, Constants.UNKNOWN).getFromDB(_username);
	if(checkUser.getSuccess()){
		res.status(409).json(
			{...messages.alreadyExists, message: "User already exists"}
		);
		return;
	}

	const userResponse: DBResponse = await new Customer(_username, _password)
		.wrap({_username, _password, _address, _name, _lastName})
		.saveToDB();
	if(!userResponse.getSuccess()){
		res.status(500).json(
			{...messages.somethingWentWrong, message: userResponse.getMessage()}
		);
		return;
	}
	res.status(201).json(
		{...messages.created, token: (<Customer> userResponse.getPayload()).getToken()}
	);
	return;
});

//  @route  GET api/users/auth/
//  @decs   login for Customers or admins
//  @access Public
router.post("/", async (req: Request, res: Response) => {
	const {_username, _password}: Record<string, string> = req.body;
	if(!_username || !_password){
		res.status(422).json({...messages.wrongInput, message: "Username or password is not provided"});
		return;
	}
	const users: User[] = [new Admin(Constants.UNKNOWN, Constants.UNKNOWN),
		new Customer(Constants.UNKNOWN, Constants.UNKNOWN)];
	for (const user of users){
		const response = await (<DatabaseObject> <unknown> user).getFromDB(_username);
		if(response.getSuccess()){
			const u = <User> <unknown> response.getPayload();
			const passIsRight = bcrypt.compareSync(_password, u._password);
			if(!passIsRight)
				break;
			res.status(200).json(
				{...messages.success, token: u.getToken()}
			);
			return;
		}
	}
	res.status(422).json(
		{...messages.wrongInput, message: "Provided username or password is wrong!"}
	);
	return;
});

export default router;

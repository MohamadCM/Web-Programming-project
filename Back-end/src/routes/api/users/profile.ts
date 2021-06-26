import express, {Request, Response, Router} from "express";
import messages from "../../../config/Messages";
import jwt from "jsonwebtoken";
import {DBResponse} from "../../../interface/Database";
import {Customer} from "../../../models/Customer";
import Constants from "../../../config/Constants";

const router: Router = express.Router();

//  @route  GET api/users/profile/
//  @decs   get customer profile
//  @access private to users
router.get("/", async (req: Request, res: Response) => {
	const token: string = <string>req.headers.authorization?.split(" ")[1];
	const userInfo = <Record<string, unknown>>jwt.decode(token);
	const userResponse: DBResponse = await new Customer(Constants.UNKNOWN, Constants.UNKNOWN)
		.getFromDB(<string>userInfo.username);
	if(!userResponse.getSuccess()){
    	res.status(404).json({...messages.notFound, message: userResponse.getMessage()});
	} else {
		const user = <Record<string, unknown>> <unknown> userResponse.getPayload();
		delete user._password;
		res.status(200).json({...messages.success, message: userResponse.getMessage(), profile: user});
	}
	return;
});

//  @route  PUT api/users/profile
//  @decs   update profile
//  @access private to users
router.put("/", async (req: Request, res: Response) => {
	const {_password, _address, _name, _lastName}: Record<string, string> = req.body;
	const token: string = <string>req.headers.authorization?.split(" ")[1];
	const _username = <string>(<Record<string, unknown>>jwt.decode(token)).username;
	if(!!_password && !new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})").test(_password)){
		res.status(422).json(
			{...messages.wrongInput, message: "Password must be at least 8 characters containing alphabet ant numbers"}
		);
		return;
	}if((_address &&( _address.length > 1000 || _address.length < 6))
		|| (_name && (_name.length > 255 || _name.length < 2))
		|| (_lastName && (_lastName.length > 255 || _lastName.length < 6))){
		res.status(422).json(
			{...messages.wrongInput, message: "Incorrect message length"}
		);
		return;
	}
	const userResponse: DBResponse = await new Customer(Constants.UNKNOWN, Constants.UNKNOWN).getFromDB(_username);
	if(!userResponse.getSuccess()){
		res.status(404).json(
			{...messages.alreadyExists, message: userResponse.getMessage()}
		);
		return;
	}

	const userSaveResponse: DBResponse = await (<Customer> userResponse.getPayload())
		.wrap({_password, _address, _name, _lastName})
		.saveToDB();
	if(!userSaveResponse.getSuccess()){
		res.status(500).json(
			{...messages.somethingWentWrong, message: userResponse.getMessage()}
		);
		return;
	}
	res.status(200).json(
		{...messages.success, message: userSaveResponse.getMessage()}
	);
	return;
});

//  @route  PUT api/users/credit
//  @decs   increase credit
//  @access private to users
router.put("/credit", async (req: Request, res: Response) => {
	const token: string = <string>req.headers.authorization?.split(" ")[1];
	const username = <string>(<Record<string, unknown>>jwt.decode(token)).username;
	const userResponse = await new Customer(Constants.UNKNOWN, Constants.UNKNOWN).getFromDB(username);
	if(!userResponse.getSuccess()){
		res.status(404).json(
			{...messages.notFound, message: userResponse.getMessage()}
		);
		return;
	}
	const customer = <Customer> userResponse.getPayload();
	customer.credit = customer.credit + Constants.CREDIT_INCREMENT_VALUE;
	const userSaveResponse = await customer.saveToDB();
	if(!userSaveResponse.getSuccess()){
		res.status(500).json(
			{...messages.somethingWentWrong, message: userResponse.getMessage()}
		);
		return;
	}
	res.status(200).json(
		{...messages.success, message: userSaveResponse.getMessage()}
	);
	return;
});
export default router;

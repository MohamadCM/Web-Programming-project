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


export default router;

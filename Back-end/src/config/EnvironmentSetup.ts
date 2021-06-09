import dotenv from "dotenv";
import {Admin} from "../models/Admin";
import {getModelForClass} from "@typegoose/typegoose";
import {logError} from "./Logger";
dotenv.config();

export default async function setup(): Promise<void> {
	{ // Creating Admin
		const adminUsername = process.env.ADMIN_DEFAULT_USERNAME || "mocm1999@gmail.com";
		const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "abcd1234";
		await getModelForClass(Admin).deleteMany({}, (err => {
			if (err) logError(`Error in removing other admin\n ${err}`, "Environment setup function");
		}));
		const adminResponse = await new Admin(adminUsername, adminPassword).saveToDB();
		if(!adminResponse.getSuccess()){
			logError(`Error in adding admin\n ${adminResponse.getMessage()}`,"Environment setup function");
		}
	}
}
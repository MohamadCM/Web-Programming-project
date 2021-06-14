import dotenv from "dotenv";
import {Admin} from "../models/Admin";
import {getModelForClass} from "@typegoose/typegoose";
import {logError, logInfo} from "./Logger";
import {Category} from "../models/Category";
import {DBResponse} from "../interface/Database";
import Constants from "./Constants";
import mkdirp from "mkdirp";
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

	{ // Creating default Category
		const categoryResponse: DBResponse = await new Category(Constants.DEFAULT_CATEGORY_NAME).saveToDB();
		if(!categoryResponse.getSuccess()){
			logError(`Error in adding category\n ${categoryResponse.getMessage()}`,"Environment setup function");
		}
	}

	{
		for (const path of Object.values(Constants.ASSETS_PATH)) { // Create static assets folders
			mkdirp(path).then(
				() => {
					logInfo(`${JSON.stringify(path)} folder created`);
				}
			).catch(
				() => {
					logInfo(`Error in creating ${JSON.stringify(path)} folder`);
				}
			);
		}
	}
}

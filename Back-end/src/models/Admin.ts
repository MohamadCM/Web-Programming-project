import { ModelType } from "@typegoose/typegoose/lib/types";
import {
	getModelForClass, modelOptions, prop, Severity
} from "@typegoose/typegoose";
import jwt from "jsonwebtoken";

import {User, UserRoles} from "../interface/User";
import { DatabaseObject, DBResponse } from "../interface/Database";
import {logError} from "../config/Logger";
import Constants from "../config/Constants";
import {Customer} from "./Customer";
import bcrypt from "bcryptjs";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Admin
implements User, DatabaseObject {
	@prop({ required: true, unique: true })
	_username: string;

	@prop({ required: true })
	_password: string;

	public constructor(username: string, password: string) {
		this._username = username;
		this._password = password;
	}

	public getToken(): string {
		const payload: Record<string, string | number> = {
    		username: this._username,
    		role: UserRoles.ADMIN
    	};
    	return jwt.sign(payload, Constants.SECRET_KEY);
	}

	public verify(token: string): boolean {
		try {
			jwt.verify(token, Constants.SECRET_KEY);
			const payload = <Record<string, unknown>>jwt.decode(token);
			return <UserRoles>payload.role >= UserRoles.ADMIN;
		}catch (e){
			return false;
		}
	}

	public wrap(customer: Record<string, unknown>): Admin {
    	this._username = <string>customer._username || this._username;
		this._password = <string>customer._password || this._password;
		return this;
	}

	public async getFromDB(username: string): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
    	try {
			const user = await adminModel.findOne({ _username: username });
    		if (!user) {
				result.setPayload(undefined).setMessage("Admin was not found in Database").setSuccess(false);
    		} else {
				this.wrap(<Record<string, string | number | undefined>><unknown>user);
    			result.setPayload(this).setMessage("Admin found successfully").setSuccess(true);
    		}
    	} catch (e) {
    		logError(`Input: ${username}\n${e}`,
				"Class Admin -> getFromDB");
    		result.setPayload(undefined).setMessage("Something went wrong trying to find the admin").setSuccess(false);
    	}
    	return result;
	}

	public async saveToDB(): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
    	try {
			this._password = bcrypt.hashSync(this._password, bcrypt.genSaltSync(Constants.HASH_SALT_ROUNDS));
    		const user = await adminModel.findOne({ _username: this._username });
    		const customerResponse = await new Customer(Constants.UNKNOWN, Constants.UNKNOWN).getFromDB(this._username);
    		if(customerResponse.getSuccess())
				result.setPayload(undefined).setMessage("User already exists!").setSuccess(false);
    		else if (user) {
    			await adminModel.updateOne({ _username: this._username }, <Record<string, unknown>><unknown> this);
    			result.setPayload(this).setMessage("Admin replaced successfully!").setSuccess(true);
    		} else {
				await adminModel.create(this);
				result.setPayload(this).setMessage("Admin created successfully!").setSuccess(true);
			}
    	} catch (e) {
    		logError(`Input: ${this}\n${e}`,
				"Class Admin -> saveToDB");
			result.setPayload(undefined).setMessage("Error in saving Admin.").setSuccess(false);
		}
		return result;
	}
	// Getters and Setters
	public get username(): string {
    	return this._username;
	}

	public set username(value: string) {
		this._username = value;
	}
}

const adminModel: ModelType<Admin> = getModelForClass(Admin);
export { Admin };

import { ModelType } from "@typegoose/typegoose/lib/types";
import {
	getModelForClass, modelOptions, prop, Severity
} from "@typegoose/typegoose";
import jwt from "jsonwebtoken";

import {User, UserRoles} from "../interface/User";
import { DatabaseObject, DBResponse } from "../interface/Database";
import {logError} from "../config/Logger";
import Constants from "../config/Constants";
import {Admin} from "./Admin";
import bcrypt from "bcryptjs";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Customer
implements User, DatabaseObject {
	@prop({ required: true, unique: true })
	_username: string;

	@prop({ required: true })
	_password: string;

	@prop({ required: false })
	private _name: string | undefined;

	@prop({ required: false })
	private _lastName: string | undefined;

	@prop({ required: false })
	private _address: string | undefined;

	@prop({ required: true })
	private _credit = 0;

	passwordChanged = false;

	public constructor(username: string, password: string) {
    	this._username = username;
    	this._password = password;
	}

	public getToken(): string {
		const payload: Record<string, string | number> = {
			username: this._username,
			role: UserRoles.CUSTOMER,
			name: this._name || "کاربر"
		};
    	return jwt.sign(payload, Constants.SECRET_KEY);
	}

	public verify(token: string): boolean {
		try {
			jwt.verify(token, Constants.SECRET_KEY);
			const payload = <Record<string, unknown>>jwt.decode(token);
			return <UserRoles>payload.role >= UserRoles.CUSTOMER;
		}catch (e){
			return false;
		}
	}

	public wrap(customer: Record<string, unknown>): Customer {
		this._username = <string>customer._username || this._username;
    	this._password = <string>customer._password || this._password;
		this._name = <string | undefined>customer._name || this._name;
    	this._lastName = <string | undefined>customer._lastName || this._lastName;
		this._address = <string | undefined>customer._address || this._address;
    	this._credit = <number>customer._credit || this._credit;
    	return this;
	}

	public async getFromDB(username: string): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
		try {
			const user = await customerModel.findOne({ _username: username });
    		if (!user) {
    			result.setPayload(undefined).setMessage("Customer was not found in Database.").setSuccess(false);
    		} else {
    			this.wrap(<Record<string, string | number | undefined>><unknown>user);
    			result.setPayload(this).setMessage("Customer was found successfully!").setSuccess(true);
    		}
		} catch (e) {
    		logError(`Input: ${username}\n${e}`,
    		    "Class Customer -> getFromDB");
			result.setPayload(undefined)
				.setMessage("Something went wrong trying to find the customer.").setSuccess(false);
		}
		return result;
	}

	public async saveToDB(): Promise<DBResponse> {
    	const result: DBResponse = new DBResponse();
		try {
			if(this.passwordChanged)
				this._password = bcrypt.hashSync(this._password, bcrypt.genSaltSync(Constants.HASH_SALT_ROUNDS));
    		const user = await customerModel.findOne({ _username: this._username });
			const adminResponse = await new Admin(Constants.UNKNOWN, Constants.UNKNOWN).getFromDB(this._username);
			if(adminResponse.getSuccess())
				result.setPayload(undefined).setMessage("User already exists!").setSuccess(false);
    		else if (user) {
    			await customerModel.updateOne({ _username: this._username }, <Record<string, unknown>><unknown> this);
				result.setPayload(this).setMessage("Customer updated successfully!").setSuccess(true);
			} else {
				await customerModel.create(this);
				result.setPayload(this).setMessage("Customer created successfully!").setSuccess(true);
    		}
		} catch (e) {
    		            logError(`Input: ${this}\n${e}`,
				"Class Customer -> saveToDB");
			result.setPayload(undefined).setMessage("Error saving Customer").setSuccess(false);
		}
		return result;
	}
	// Getters and Setters
	public get credit(): number {
    	return this._credit;
	}

	public set credit(value: number) {
		this._credit = value;
	}

	public get address(): string | undefined {
    	return this._address;
	}

	public set address(value: string | undefined) {
    	this._address = value;
	}

	public get lastName(): string | undefined {
    	return this._lastName;
	}

	public set lastName(value: string | undefined) {
		this._lastName = value;
	}

	public get name(): string | undefined {
    	return this._name;
	}

	public set name(value: string | undefined) {
    	this._name = value;
	}

	public get username(): string {
    	return this._username;
	}

	public set username(value: string) {
    	this._username = value;
	}
	public setPasswordChanged(value: boolean): Customer{
		this.passwordChanged = value;
		return this;
	}
}

const customerModel: ModelType<Customer> = getModelForClass(Customer);
export { Customer };

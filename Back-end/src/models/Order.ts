import { ModelType } from "@typegoose/typegoose/lib/types";
import {
	getModelForClass, modelOptions, prop, Severity
} from "@typegoose/typegoose";
import uniqid from "uniqid";
import { DatabaseObject, DBResponse } from "../interface/Database";
import {logError} from "../config/Logger";
import Constants from "../config/Constants";
import {Customer} from "./Customer";
import {Product} from "./Product";

enum ORDER_STATUS {
	IN_PROGRESS = "درحال انجام",
	DONE = "انجام شده",
	CANCELLED = "لغو شده"
}

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Order
implements DatabaseObject {
	@prop({ required: true })
	private _product: string; // Name of the product

	@prop({ required: true })
	private _count: number = 0;

	@prop({ required: true })
	private _username: string;

	@prop({required: true})
	private _name: string | undefined;

	@prop({required: true})
	private _lastName: string | undefined;

	@prop({required: true})
	private _address: string | undefined;

	@prop({ required: true })
	private _totalCost: number = 0;

	@prop({required: true})
	private _date: Date = new Date();

	@prop({required: true})
	private _trackingCode = uniqid();

	@prop({required: true})
	private _status: ORDER_STATUS = ORDER_STATUS.IN_PROGRESS;

	public constructor(product: string, username: string) {
		this._product = product;
		this._username = username;
	}


	public wrap(order: Record<string, unknown>): Order {
		this._product = <string | undefined>order._product || this._product;
    	this._count = <number | undefined>order._count || this._count;
    	this._username = <string | undefined>order._username || this._username;
    	this._date = <Date | undefined> order._date || this._date;
		this._name = <string | undefined>order._name || this._name;
		this._lastName = <string | undefined>order._lastName || this._lastName;
		this._address = <string | undefined>order._address || this._address;
		this._totalCost = <number | undefined>order._totalCost || this._totalCost;
		this._trackingCode = <string | undefined>order._trackingCode || this._trackingCode;
		this._status = <ORDER_STATUS | undefined> order._status || this._status;
    	return this;
	}

	public async getFromDB(trackingCode: string): Promise<DBResponse> {
    	const result: DBResponse = new DBResponse();
		try {
    		const order = await orderModel.findOne({ _trackingCode: trackingCode });
    		if (!order) {
    			result.setPayload(undefined).setMessage("Order was not found in Database.").setSuccess(false);
    		} else {
    			this.wrap(<Record<string, string | number | undefined>><unknown>order);
    			result.setPayload(this).setMessage("Order was found successfully!").setSuccess(true);
    		}
    	} catch (e) {
			logError(`Input: ${name}\n${e}`,
				"Class Order -> getFromDB");
    		result.setPayload(undefined)
				.setMessage("Something went wrong trying to find the order.").setSuccess(false);
    	}
		return result;
	}

	public async saveToDB(): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
		try {
			const userResponse = await new Customer(Constants.UNKNOWN, Constants.UNKNOWN).getFromDB(this._username);
			if(!userResponse.getSuccess())
				result.setPayload(undefined).setMessage(userResponse.getMessage()).setSuccess(false);
			else {
				const user = <Customer> userResponse.getPayload();
				this._name = user.name;
				this._lastName = user.lastName;
				this.address = user.address;
				const productResponse = await new Product(Constants.UNKNOWN)
					.getFromDB(this._product);
				if(!productResponse.getSuccess())
					result.setPayload(undefined).setMessage(productResponse.getMessage()).setSuccess(false);
				else {
					const product = <Product> productResponse.getPayload();
					this._totalCost = this._count * <number>product.price;
					if(product.inventory <= this._count)
						result.setPayload(undefined).setMessage("Not enough products in inventory!").setSuccess(false);
					else if (user.credit < this._totalCost)
						result.setPayload(undefined).setMessage("User doesn't have enough credit").setSuccess(false);
					else {
						product.inventory = product.inventory - this.count;
						const productSaveResponse = await product.saveToDB();
						if(!productSaveResponse.getSuccess())
							result.setPayload(undefined).setMessage(productResponse.getMessage()).setSuccess(false);
						else {
							user.credit = user.credit - this._totalCost;
							const userSaveResponse = await user.saveToDB();
							if (!userSaveResponse.getSuccess())
								result.setPayload(undefined)
									.setMessage(userSaveResponse.getMessage()).setSuccess(false);
							else {
								await orderModel.create(this);
								result.setPayload(this).setMessage("Order created successfully!").setSuccess(true);
							}
						}
					}
				}
			}
		} catch (e) {
			logError(`Input: ${this}\n${e}`,
    			"Class Order -> saveToDB");
    		result.setPayload(undefined).setMessage("Error in saving order.").setSuccess(false);
		}
    	return result;
	}
	// Getting count of orders
	public static async getCount(params: Record<string, unknown>):
	Promise<number | undefined> {
    	try {
			Object.keys(params)
				.forEach((key) => params[key] === undefined && delete params[key]); // removing undefined values
    		const count: number = await orderModel.countDocuments(params);
    		return Promise.resolve(count);
		} catch (e) {
    		logError(`Input: ${params.toString()}\n${e}`,
    			"Class Order -> getCount method");
    		return Promise.resolve(undefined);
    	}
	}

	// Getting a list of orders
	public static async getList(params: Record<string, unknown>,
    	limit: number, offset: number,
    	fields: string | undefined, sort: Record<string, number>):
		Promise<Order[] | undefined> {
		try {
			if (limit === 0) return Promise.resolve([]);
			Object.keys(params)
    			.forEach((key) => params[key] === undefined && delete params[key]); // removing undefined values
			const list = await orderModel
				.find(params, fields || null)
    			.skip(offset)
				.limit(limit)
				.sort(sort || null);
			const result: Order[] = new Array<Order>();
    		for (const order of list) {
				result.push(
					new Order(Constants.UNKNOWN, Constants.UNKNOWN).wrap(<Record<string, unknown>><unknown> order)
    			);
			}
			return Promise.resolve(result);
    	} catch (e) {
    		logError(`Input${JSON.stringify(params)}\n${e}`,
				"Class Order -> getList method");
    		return Promise.resolve(undefined);
    	}
	}


	// Getters and setters
	get status(): ORDER_STATUS {
		return this._status;
	}

	set status(value: ORDER_STATUS) {
		this._status = value;
	}
	get trackingCode(): string {
		return this._trackingCode;
	}

	set trackingCode(value: string) {
		this._trackingCode = value;
	}
	get date(): Date {
		return this._date;
	}

	set date(value: Date) {
		this._date = value;
	}
	get totalCost(): number {
		return this._totalCost;
	}

	set totalCost(value: number) {
		this._totalCost = value;
	}
	get address(): string | undefined {
		return this._address;
	}

	set address(value: string | undefined) {
		this._address = value;
	}
	get lastName(): string | undefined {
		return this._lastName;
	}

	set lastName(value: string | undefined) {
		this._lastName = value;
	}
	get name(): string | undefined {
		return this._name;
	}

	set name(value: string | undefined) {
		this._name = value;
	}
	get username(): string {
		return this._username;
	}

	set username(value: string) {
		this._username = value;
	}
	get count(): number {
		return this._count;
	}

	set count(value: number) {
		this._count = value;
	}
	get product(): string {
		return this._product;
	}

	set product(value: string) {
		this._product = value;
	}
}

const orderModel: ModelType<Order> = getModelForClass(Order);
export { Order };

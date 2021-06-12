import { ModelType } from "@typegoose/typegoose/lib/types";
import {
	getModelForClass, modelOptions, prop, Severity
} from "@typegoose/typegoose";
import { DatabaseObject, DBResponse } from "../interface/Database";
import {logError} from "../config/Logger";
import Constants from "../config/Constants";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Product
implements DatabaseObject {
	@prop({ required: true, unique: true })
	private _name: string;

	@prop({ required: true })
	private _category: string | undefined;

	@prop({ required: true })
	private _price: number | undefined;

	@prop({ required: true })
	private _soldCount = 0;

	@prop({ required: false })
	private _picture: string | undefined;

	public constructor(name: string) {
		this._name = name;
	}


	public wrap(product: Record<string, unknown>): Product {
		this._name = <string | undefined>product._name || this._name;
		this._category = <string | undefined>product._category || this._category;
    	this._price = <number | undefined>product._price || this._price;
		this._soldCount = <number | undefined>product._soldCount || this._soldCount;
    	this._picture = <string | undefined>product._picture || this._picture;
		return this;
	}

	public async getFromDB(name: string): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
    	try {
			const product = await productModel.findOne({ _name: name });
    		if (!product) {
    			result.setPayload(undefined).setMessage("Product was not found in Database.").setSuccess(false);
			} else {
    			this.wrap(<Record<string, string | number | undefined>><unknown>product);
    			result.setPayload(this).setMessage("Product was found successfully!").setSuccess(true);
			}
		} catch (e) {
			logError(`Input: ${name}\n${e}`,
    			"Class Product -> getFromDB");
    		result.setPayload(undefined)
    			.setMessage("Something went wrong trying to find the product.").setSuccess(false);
		}
    	return result;
	}

	public async saveToDB(): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
		try {
    		const product = await productModel.findOne({ _name: this._name });
    		if (product) {
    			await productModel.updateOne({ _name: this._name }, <Record<string, unknown>><unknown> this);
				result.setPayload(this).setMessage("Product updated successfully!").setSuccess(true);
    		} else {
				await productModel.create(this);
    			result.setPayload(this).setMessage("Product created successfully!").setSuccess(true);
			}
    	} catch (e) {
    		logError(`Input: ${this}\n${e}`,
    			"Class Product -> saveToDB");
			result.setPayload(undefined).setMessage("Error in saving product.").setSuccess(false);
		}
		return result;
	}
	// Getting count of products
	public static async getCount(params: Record<string, unknown>):
	Promise<number | undefined> {
		try {
			Object.keys(params)
				.forEach((key) => params[key] === undefined && delete params[key]); // removing undefined values
			const count: number = await productModel.countDocuments(params);
			return Promise.resolve(count);
		} catch (e) {
			logError(`Input: ${params.toString()}\n${e}`,
				"Class Products -> getCount method");
			return Promise.resolve(undefined);
		}
	}

	// Getting a list of products
	public static async getList(params: Record<string, unknown>,
		limit: number, offset: number,
		fields: string | undefined, sort: Record<string, number>):
		Promise<Product[] | undefined> {
		try {
			if (limit === 0) return Promise.resolve([]);
			Object.keys(params)
				.forEach((key) => params[key] === undefined && delete params[key]); // removing undefined values
			const list = await productModel
				.find(params, fields || null)
				.skip(offset)
				.limit(limit)
				.sort(sort || null);
			const result: Product[] = new Array<Product>();
			for (const product of list) {
				result.push(
					new Product(Constants.UNKNOWN).wrap(<Record<string, unknown>><unknown> product)
				);
			}
			return Promise.resolve(result);
		} catch (e) {
			logError(`Input${params.toString()}\n${e}`,
				"Class Products -> getList method");
			return Promise.resolve(undefined);
		}
	}


	// Getters and setters
	get picture(): string | undefined {
		return this._picture;
	}

	set picture(value: string | undefined) {
		this._picture = value;
	}
	get soldCount(): number {
		return this._soldCount;
	}

	set soldCount(value: number) {
		this._soldCount = value;
	}
	get price(): number | undefined {
		return this._price;
	}

	set price(value: number | undefined) {
		this._price = value;
	}
	get category(): string | undefined {
		return this._category;
	}

	set category(value: string | undefined) {
		this._category = value;
	}
	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}
}

const productModel: ModelType<Product> = getModelForClass(Product);
export { Product };

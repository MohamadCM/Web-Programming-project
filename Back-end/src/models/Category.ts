import { ModelType } from "@typegoose/typegoose/lib/types";
import {
	getModelForClass, modelOptions, prop, Severity
} from "@typegoose/typegoose";
import { DatabaseObject, DBResponse } from "../interface/Database";
import {logError} from "../config/Logger";
import Constants from "../config/Constants";
import {Product} from "./Product";

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Category
implements DatabaseObject {
	@prop({ required: true, unique: true })
	private _name: string;

	public updateObject: Record<string, unknown> | undefined;

	public constructor(name: string) {
		this._name = name;
	}


	public wrap(category: Record<string, unknown>): Category {
    	this._name = <string | undefined>category._name || this._name;
		return this;
	}

	public async getFromDB(name: string): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
		try {
    		const category = await categoryModel.findOne({ _name: name });
			if (!category) {
    			result.setPayload(undefined).setMessage("Category was not found in Database.").setSuccess(false);
			} else {
    			this.wrap(<Record<string, string | number | undefined>><unknown>category);
				result.setPayload(this).setMessage("Category was found successfully!").setSuccess(true);
    		}
		} catch (e) {
    		logError(`Input: ${name}\n${e}`,
				"Class Category -> getFromDB");
    		result.setPayload(undefined)
    			.setMessage("Something went wrong trying to find the category.").setSuccess(false);
    	}
    	return result;
	}

	public async saveToDB(): Promise<DBResponse> {
    	const result: DBResponse = new DBResponse();
    	try {
    		const category = await categoryModel.findOne({ _name: this._name });
			if (category) {
				await categoryModel.updateOne({ _name: this._name },
					this.updateObject || <Record<string, unknown>><unknown> this);
				if(this.updateObject && this.updateObject._name) {
					const products = await Product
						.getList({_category: this._name}, Number.MAX_SAFE_INTEGER, 0, undefined, {});
					if (products) {
						for (const product of products) {
							product.category = <string>this.updateObject._name;
							const productResponse = await product.saveToDB();
							if (!productResponse.getSuccess()) {
								logError(productResponse.getMessage() ||
									`Error resetting category for product ${product.name}`,
								"Class Category -> saveToDB");
							}
						}
					}
				}
    			result.setPayload(this).setMessage("Category updated successfully!").setSuccess(true);
    		} else {
    			await categoryModel.create(this);
    			result.setPayload(this).setMessage("Category created successfully!").setSuccess(true);
			}
    	} catch (e) {
			logError(`Input: ${this}\n${e}`,
				"Class Category -> saveToDB");
    		result.setPayload(undefined).setMessage("Error saving Category").setSuccess(false);
    	}
    	return result;
	}

	public async removeFromDB(): Promise<DBResponse> {
		const result: DBResponse = new DBResponse();
		try {
			const category = await categoryModel.findOne({ _name: this._name });
			if (!category) {
				result.setPayload(undefined).setMessage("Category was not found in Database.").setSuccess(false);
			} else {
				const products = await Product
					.getList({_category: this._name}, Number.MAX_SAFE_INTEGER, 0, undefined, {});
				if(products) {
					for (const product of products){
						product.category = Constants.DEFAULT_CATEGORY_NAME;
						const productResponse = await product.saveToDB();
						if(!productResponse.getSuccess()){
							logError(productResponse.getMessage() ||
								`Error resetting category for product ${product.name}`,
							"Class Category -> removeFromDB");
						}
					}
				}
				await categoryModel.deleteOne({ _name: this._name });
				result.setPayload(undefined).setMessage("Category was removed successfully!").setSuccess(true);
			}
		} catch (e) {
			logError(`Input: ${this._name}\n${e}`,
				"Class Category -> removeFromDB");
			result.setPayload(undefined)
				.setMessage("Something went wrong trying to delete the category.").setSuccess(false);
		}
		return result;
	}
	// Getting count of categories
	public static async getCount(params: Record<string, unknown>):
	Promise<number | undefined> {
    	try {
    		Object.keys(params)
    			.forEach((key) => params[key] === undefined && delete params[key]); // removing undefined values
			const count: number = await categoryModel.countDocuments(params);
			return Promise.resolve(count);
		} catch (e) {
    		logError(`Input: ${params.toString()}\n${e}`,
    			"Class Category -> getCount method");
			return Promise.resolve(undefined);
		}
	}

	// Getting a list of categories
	public static async getList(params: Record<string, unknown>,
    	limit: number, offset: number,
		fields: string | undefined, sort: Record<string, number>):
		Promise<Category[] | undefined> {
    	try {
			if (limit === 0) return Promise.resolve([]);
    		Object.keys(params)
				.forEach((key) => params[key] === undefined && delete params[key]); // removing undefined values
			const list = await categoryModel
    			.find(params, fields || null)
    			.skip(offset)
    			.limit(limit)
    			.sort(sort || null);
    		const result: Category[] = new Array<Category>();
			for (const category of list) {
				result.push(
					new Category(Constants.UNKNOWN).wrap(<Record<string, unknown>><unknown> category)
    			);
			}
			return Promise.resolve(result);
    	} catch (e) {
    		logError(`Input${params.toString()}\n${e}`,
    			"Class Category -> getList method");
    		return Promise.resolve(undefined);
    	}
	}


	// Getters and setters
	get name(): string {
    	return this._name;
	}

	set name(value: string) {
    	this._name = value;
	}
}

const categoryModel: ModelType<Category> = getModelForClass(Category);
export { Category };

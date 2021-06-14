import express, {Request, Response, Router} from "express";
import messages from "../../../config/Messages";
import {Product} from "../../../models/Product";
import {logError, logInfo} from "../../../config/Logger";
import authorize from "../../../middlewares/authorization";
import {Admin} from "../../../models/Admin";
import Constants from "../../../config/Constants";
import {DBResponse} from "../../../interface/Database";
import {Category} from "../../../models/Category";
import multer, { Multer } from "multer";
import fs from "fs";

const router: Router = express.Router();

//  @route  GET api/products/
//  @decs   get a list of products
//  @access public
router.get("/", async (req: Request, res: Response) => {
	try {
		const {_name, _category, _picture, _soldCount, fields, sort} = req.query;
		const {limit, offset, _price} = req.query;
		if(!limit || !offset){
			res.status(422).json({...messages.wrongInput, message: "Limit or offset is not provided!"});
			return;
		}
		const qLimit = Number.parseInt(<string>limit);
		const qOffset = Number.parseInt(<string>offset);
		let _qPrice;
		if(_price) _qPrice = Number.parseInt(<string>_price);
		const count: number | undefined = await Product
			.getCount({_name, _category, _picture, price: _qPrice, _soldCount});
		if(!count){
			res.status(404).json({...messages.wrongInput, message: "No product was found!"});
			return;
		}
		const products: Product[] | undefined = await Product
			.getList({_name, _category, _picture, price: _qPrice, _soldCount},
				qLimit, qOffset, <string | undefined>fields, JSON.parse(<string | undefined>sort || "{}"));
		res.status(200).json({...messages.success, count, products});
		return;
	} catch (e) {
	    logError(`Something went wrong during API call, Input query: ${JSON.stringify(req.query)}, ${e}`,
			"GET products");
		res.status(500).json(messages.somethingWentWrong);
		return;
	}
});

//  @route  POST api/products/
//  @decs   add or update a product
//  @access admin users
router.post("/", authorize(new Admin(Constants.UNKNOWN, Constants.UNKNOWN)),
	async (req: Request, res: Response) => {
		try {
			let {_name, _category, _picture, _soldCount, _price, _newName} = req.body;
			let updateObject = {};
			if(_name){ // Will update if name is provided
			    const productResponse: DBResponse = await new Product(Constants.UNKNOWN).getFromDB(_name);
			    if(!productResponse.getSuccess()) {
					res.status(404).json({...messages.wrongInput, message: productResponse.getMessage()});
					return;
				}
			    const product = <Product> productResponse.getPayload();
			    _name = product.name;
			    _category = _category || product.category;
			    _picture = _picture || product.picture;
			    _soldCount = _soldCount || product.soldCount;
			    _price = _price || product.price;
			    _newName = _newName || product.name;
			}
			if(!_category || !_price || !_newName) {
				res.status(422)
					.json({...messages.wrongInput, message: "Required fields are not provided"});
				return;
			}
			updateObject = {_name: _newName, _category, _picture,
				_soldCount: _soldCount ? Number.parseInt(_soldCount) : undefined,
				_price: Number.parseInt(<string>_price)};
			if(_category){
			    const categoryResponse: DBResponse = await new Category(Constants.UNKNOWN).getFromDB(_category);
			    if(!categoryResponse.getSuccess()){
					res.status(404).json({...messages.wrongInput, message: categoryResponse.getMessage()});
					return;
				}
			}
			const product = new Product(Constants.UNKNOWN)
				.wrap(!_name ? updateObject : {_name, _category, _picture, _soldCount, _price});
			product.updateObject = updateObject;
			const productResponse: DBResponse = await product.saveToDB();
			if(productResponse.getSuccess()){
				res.status(_name ? 200 : 201)
					.json({...messages.success, message: productResponse.getMessage()});
			    return;
			}
			res.status(400).json(messages.somethingWentWrong);
			return;
		} catch (e) {
			logError(`Something went wrong during API call, Input query: ${JSON.stringify(req.body)},
			 ${e}`, "POST products");
			res.status(500).json(messages.somethingWentWrong);
			return;
		}
	});

const upload: Multer = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, Constants.ASSETS_PATH.PRODUCT_PICTURES);
		},
		filename(req, file, callback) {
			let extension = "";
			const splitName = file.originalname.split(".");
			if (file.originalname.includes(".")) extension = splitName[splitName.length - 1];
			callback(null, `product-${Date.now()}-${splitName[0]}.${extension}`);
		}
	}),
	fileFilter(req: Express.Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
		if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	limits: {
		files: 1, // Allow only 1 file per request
		fileSize: 1024 * 1024 * 20 // Max file size is 20 MB
	}
});
//  @route  POST api/products/picture
//  @decs   Upload a picture for product
//  @access admin users
router.post("/picture",
	authorize(new Admin(Constants.UNKNOWN, Constants.UNKNOWN)),
	upload.single("_picture"),
	async (req: Request, res: Response) => {
		try {
			const { file } = req;
			if (!file) res.status(415).json(messages.notSupported);
			else {
				const { _name } = req.body;
				if (!_name) res.status(422).json({ ...messages.wrongInput, message: "Name is not provided!" });
				else {
					const productResponse: DBResponse = await
					new Product(Constants.UNKNOWN).getFromDB(_name);
					if (!productResponse.getSuccess()) {
						res.status(404)
							.json({ ...messages.notFound, message: productResponse.getMessage() });
					} else {
						const product: Product = <Product> productResponse.getPayload();
						if (product.picture) { // Checking whether old picture exists
							try {
								fs.unlinkSync("public" + product.picture);
							} catch (e){
								if(e)
									logInfo(`Unable to delete old product picture for product=${product.name}
													pic=${JSON.stringify(product.picture)}`); // Removing old picture
							}
						}
						product.picture = "/" + Constants.ASSETS_PATH.PRODUCT_PICTURES.split("/").pop()
							+ "/" +file.filename;
						const result: DBResponse = await product.saveToDB();
						if (!result.getSuccess()) {
							res.status(500).json({
								...messages.somethingWentWrong,
								message: result.getMessage()
							});
						} else res.status(200).json({ ...messages.success, message: result.getMessage() });
					}
				}
			}
			return;
		} catch (e) {
			logError(`Input:${JSON.stringify(req.body)}\n${e}`,
				"POST api/order/check/picture");
			res.status(500).json(messages.somethingWentWrong);
		}
	});

export default router;

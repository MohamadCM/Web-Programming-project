import express, {Request, Response, Router} from "express";
import messages from "../../../config/Messages";
import {Product} from "../../../models/Product";
import {logError} from "../../../config/Logger";

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
		if(!products || products.length === 0){
			res.status(404).json({...messages.wrongInput, message: "No product was found!"});
			return;
		}
		res.status(200).json({...messages.success, count, products});
		return;
	} catch (e) {
	    logError(`Something went wrong during API call, Input query: ${JSON.stringify(req.query)}`, "GET products");
		res.status(500).json(messages.somethingWentWrong);
		return;
	}
});

export default router;

import express, {Request, Response, Router} from "express";
import messages from "../../../config/Messages";
import {logError} from "../../../config/Logger";
import {Category} from "../../../models/Category";

const router: Router = express.Router();

//  @route  GET api/products/category
//  @decs   get a list of categories
//  @access public
router.get("/", async (req: Request, res: Response) => {
	try {
		const {_name, fields, sort} = req.query;
		const {limit, offset} = req.query;
		if(!limit || !offset){
			res.status(422).json({...messages.wrongInput, message: "Limit or offset is not provided!"});
			return;
		}
		const qLimit = Number.parseInt(<string>limit);
		const qOffset = Number.parseInt(<string>offset);
		const count: number | undefined = await Category.getCount({_name});
		if(!count){
			res.status(404).json({...messages.wrongInput, message: "No category was found!"});
			return;
		}
		const categories: Category[] | undefined = await Category.getList({_name},
			qLimit, qOffset, <string | undefined>fields, JSON.parse(<string | undefined>sort || "{}"));
		res.status(200).json({...messages.success, count, categories: categories});
		return;
	} catch (e) {
		logError(`Something went wrong during API call, Input query: ${JSON.stringify(req.query)}, ${e}`,
			"GET categories");
		res.status(500).json(messages.somethingWentWrong);
		return;
	}
});

export default router;

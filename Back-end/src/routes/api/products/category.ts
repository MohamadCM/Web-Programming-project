import express, {Request, Response, Router} from "express";
import messages from "../../../config/Messages";
import {logError} from "../../../config/Logger";
import {Category} from "../../../models/Category";
import authorize from "../../../middlewares/authorization";
import {Admin} from "../../../models/Admin";
import Constants from "../../../config/Constants";
import {DBResponse} from "../../../interface/Database";

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


//  @route  POST api/products/category
//  @decs   add or update a category
//  @access admin users
router.post("/", authorize(new Admin(Constants.UNKNOWN, Constants.UNKNOWN)),
	async (req: Request, res: Response) => {
		try {
			let {_name, _newName} = req.body;
			let updateObject = {};
			if(_name){ // Will update if name is provided
				const categoryResponse: DBResponse = await new Category(Constants.UNKNOWN).getFromDB(_name);
				if(!categoryResponse.getSuccess()) {
					res.status(404).json({...messages.wrongInput, message: categoryResponse.getMessage()});
					return;
				}
				const category = <Category> categoryResponse.getPayload();
				_name = category.name;
				_newName = _newName || category.name;
			}
			if(!_newName) {
				res.status(422)
					.json({...messages.wrongInput, message: "Required fields are not provided"});
				return;
			}
			updateObject = {_name: _newName};
			const category = new Category(Constants.UNKNOWN)
				.wrap(!_name ? updateObject : {_name});
			category.updateObject = updateObject;
			const categoryResponse: DBResponse = await category.saveToDB();
			if(categoryResponse.getSuccess()){
				res.status(_name ? 200 : 201)
					.json({...messages.success, message: categoryResponse.getMessage()});
				return;
			}
			res.status(400).json(messages.somethingWentWrong);
			return;
		} catch (e) {
			logError(`Something went wrong during API call, Input query: ${JSON.stringify(req.body)},
			 ${e}`, "POST categories");
			res.status(500).json(messages.somethingWentWrong);
			return;
		}
	});

//  @route  DELETE api/products/category
//  @decs   Delete a category
//  @access admin users
router.delete("/", authorize(new Admin(Constants.UNKNOWN, Constants.UNKNOWN)),
	async (req: Request, res: Response) => {
		try {
			const {_name} = req.body;
			if(!_name){
				res.status(422).json({...messages.wrongInput, message: "Category name is not provided!"});
				return;
			}
			const categoryResponse = await new Category(<string> _name).removeFromDB();
			if(!categoryResponse.getSuccess()){
				res.status(404).json({...messages.notFound, message: categoryResponse.getMessage()});
				return;
			}
			res.status(204).json(messages.noContent);
			return;
		} catch (e) {
			logError(`Something went wrong during API call, Input query: ${JSON.stringify(req.query)}, ${e}`,
				"GET categories");
			res.status(500).json(messages.somethingWentWrong);
			return;
		}
	});

export default router;

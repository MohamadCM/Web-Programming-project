import express, {Request, Response, Router} from "express";
import messages from "../../../config/Messages";
import {removeFields} from "../../../config/Utils";
import {logError} from "../../../config/Logger";
import authorize from "../../../middlewares/authorization";
import {Customer} from "../../../models/Customer";
import Constants from "../../../config/Constants";
import {Order} from "../../../models/Order";
import {Admin} from "../../../models/Admin";
import jwt from "jsonwebtoken";
import {DBResponse} from "../../../interface/Database";

const router: Router = express.Router();

//  @route  GET api/orders/
//  @decs   get a list of orders
//  @access private
router.get("/", authorize(new Customer(Constants.UNKNOWN, Constants.UNKNOWN)),
	async (req: Request, res: Response) => {
		try {
			let {_username} = req.query;
			const token = (<string>(req.headers.authorization || <string>req.query.token)).split(" ")[1];
			if(!new Admin(Constants.UNKNOWN, Constants.UNKNOWN).verify(token))
			    _username = <string>(<Record<string, unknown>>jwt.decode(token)).username;
			const {limit, offset, _trackingCode, fields, sort} = req.query;
			if(!limit || !offset){
				res.status(422).json({...messages.wrongInput, message: "Limit or offset is not provided!"});
				return;
			}
			const qLimit = Number.parseInt(<string>limit);
			const qOffset = Number.parseInt(<string>offset);
			const count: number | undefined = await Order.getCount({_username, _trackingCode});
			if(!count){
				res.status(404).json({...messages.wrongInput, message: "No order was found!"});
				return;
			}
			const orders: Order[] | undefined = await Order.getList({_username, _trackingCode},
				qLimit, qOffset, <string | undefined>fields, JSON.parse(<string | undefined>sort || "{}"));
			let result = <Array<Record<string, unknown>>><unknown>orders;
			if(fields && orders)
				result = removeFields(orders, <string>fields);
			res.status(200).json({...messages.success, count, orders: result});
			return;
		} catch (e) {
			logError(`Something went wrong during API call, Input query: ${req.query}, ${e}`,
				"GET orders");
			res.status(500).json(messages.somethingWentWrong);
			return;
		}
	});

//  @route  POST api/orders/
//  @decs   add an order
//  @access Customer users
router.post("/", authorize(new Customer(Constants.UNKNOWN, Constants.UNKNOWN)),
	async (req: Request, res: Response) => {
		try {
			const {_product, _count} = req.body;
			if(!_product || !_count) {
				res.status(422)
					.json({...messages.wrongInput, message: "Required fields are not provided"});
				return;
			}
			const _username = <string>(<Record<string, unknown>>jwt
				.decode((<string>(req.headers.authorization || <string>req.query.token)).split(" ")[1])).username;
			const order = new Order(Constants.UNKNOWN, Constants.UNKNOWN)
				.wrap({_product, _count: Number.parseInt(_count), _username});
			const orderResponse: DBResponse = await order.saveToDB();
			if(orderResponse.getSuccess()){
				res.status(201)
					.json({...messages.success, message: orderResponse.getMessage()});
				return;
			}
			res.status(400).json({...messages.somethingWentWrong, messages: orderResponse.getMessage()});
			return;
		} catch (e) {
			logError(`Something went wrong during API call, Input query: ${JSON.stringify(req.body)},
			 ${e}`, "POST products");
			res.status(500).json(messages.somethingWentWrong);
			return;
		}
	});

export default router;

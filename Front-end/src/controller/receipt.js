import { RequestTypes, sendRequest} from "../utils/request";

async function getReceipts(limit = Number.MAX_SAFE_INTEGER,
	offset = 0, trackingCode= undefined, sort = {"_date": -1}, fields){
	const response = await sendRequest(RequestTypes.GET, "/api/orders/", {
		_trackingCode: trackingCode,
		sort,
		limit,
		offset,
		fields
	});
	if(response.status === 200) {
		const orders = response.data.orders;
		const result = [];
		for (const order of orders)
		  result.push({
				product: order._product,
				trackingCode: order._trackingCode,
				address: order._address,
				username: order._username,
				status: order._status,
				price: order._totalCost
			});
		return result;
	}
	else if(response.status !== 404) {
		alert("خطایی به وجود آمده است" + "\n" + response.data.msg + "\n" + response.data.message || "");
		return {};
	}
	return {};
}

async function createOrder(product, count){
	const body = {
		_product: product,
		_count: count
	};
	Object.keys(body)
		.forEach((key) => body[key] === undefined && delete body[key]); // removing undefined values
	const result = await sendRequest(RequestTypes.POST, "/api/orders",{}, body);
	if(result.status === 200 || result.status === 201){
		return true;
	}
	else {
		if(result.status !== 400)
			alert("خطایی به وجود آمده است" + "\n" + result.data.msg + "\n" + result.data.message || "");
		return {
			message: result.data.message
		};
	}
}

async function updateStatus(trackingCode, status) {
	const result = await sendRequest(RequestTypes.PUT, "/api/orders/status", {}, {
	  _order: trackingCode,
		_status: status
	});
	if(result.status === 200){
		return true;
	}
	else {
		alert("خطایی به وجود آمده است" + "\n" + result.data.msg + "\n" + result.data.message || "");
		return false;
	}
}

export default {getReceipts, createOrder, updateStatus};

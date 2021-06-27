import { RequestTypes, sendRequest } from "../utils/request";
import config from "../../config";

async function getProducts(limit = Number.MAX_SAFE_INTEGER,
	offset = 0, name= undefined,category= undefined, minPrice,
	maxPrice, sort = {"_soldCount": -1}, fields){
	const response = await sendRequest(RequestTypes.GET, "/api/products/", {
		_category: category && category.length ? category : undefined,
		_name: name && name.length ? name : undefined,
		_price: minPrice && maxPrice && maxPrice > minPrice ? {"$gte": minPrice,"$lte":maxPrice}: undefined,
		sort,
		limit,
		offset,
		fields
	});
	if(response.status === 200) {
		const products = response.data.products;
		const result = [];
		for (const product of products)
			result.push({
				id: products.indexOf(product),
				name: product._name,
				category: product._category,
				price: product._price,
				image: config.BASE_URL + product._picture,
				inventory: product._inventory
			});
		return result;
	}
	else if(response.status !== 404) {
		alert("خطایی به وجود آمده است" + "\n" + response.data.msg + "\n" + response.data.message || "");
		return {};
	}
	return {};
}

export default {getProducts};

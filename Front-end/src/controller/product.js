import { RequestTypes, sendRequest, uploadFile } from "../utils/request";
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
async function updateProduct(name, category, price, inventory, newName, image) {
	const body = {
		_name: name,
		_newName: newName,
		_inventory: inventory,
		_price: price,
		_category: category
	};
	const formData = new FormData();
	Object.keys(body)
		.forEach((key) => body[key] === undefined && delete body[key]); // removing undefined values
	const result = await sendRequest(RequestTypes.POST, "/api/products",{}, body);
	if(result.status === 200 || result.status === 201){
	  if(image) {
			formData.append("_picture", image);
			formData.append("_name", newName);
			const response = await uploadFile("/api/products/picture", formData);
			if (response.status !== 200) {
				alert("در آپلود تصویر خطایی به وجود آمد!");
			}
		}
		return true;
	}
	else {
		alert("خطایی به وجود آمده است" + "\n" + result.data.msg + "\n" + result.data.message || "");
		return false;
	}
}
export default {getProducts, updateProduct};

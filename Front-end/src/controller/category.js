import { RequestTypes, sendRequest } from "../utils/request";

async function getCategories(limit = Number.MAX_SAFE_INTEGER,
	offset = 0, name= undefined, sort = {"_name": 1}, fields){
	const response = await sendRequest(RequestTypes.GET, "/api/products/category", {
		_name: name && name.length ? name : undefined,
		sort,
		limit,
		offset,
		fields
	});
	if(response.status === 200) {
		const categories = response.data.categories;
		const result = [];
		for (const category of categories)
			result.push({
				id: categories.indexOf(category),
				name: category._name
			});
		return result;
	}
	else if(response.status !== 404) {
		alert("خطایی به وجود آمده است" + "\n" + response.data.msg + "\n" + response.data.message || "");
		return {};
	}
	return {};
}
async function updateCategory(name, newName) {
	const body = {
		_name: name,
		_newName: newName
	};
	Object.keys(body)
		.forEach((key) => body[key] === undefined && delete body[key]); // removing undefined values
	const result = await sendRequest(RequestTypes.POST, "/api/products/category",{}, body);
	if(result.status === 200 || result.status === 201){
		return true;
	}
	else {
		alert("خطایی به وجود آمده است" + "\n" + result.data.msg + "\n" + result.data.message || "");
		return false;
	}
}
async function removeCategory(name){
	const body = {
		_name: name
	};
	Object.keys(body)
		.forEach((key) => body[key] === undefined && delete body[key]); // removing undefined values
	const result = await sendRequest(RequestTypes.DELETE, "/api/products/category",{}, body);
	if(result.status === 204){
		return true;
	}
	else {
		alert("خطایی به وجود آمده است" + "\n" + result.data.msg + "\n" + result.data.message || "");
		return false;
	}
}
export default { getCategories, updateCategory, removeCategory };

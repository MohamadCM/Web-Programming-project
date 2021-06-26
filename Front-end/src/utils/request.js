import axios from "axios";
import config from "../../config";
const RequestTypes = Object.freeze({"GET":"get", "POST":"post", "PUT":"put", "DELETE": "delete"});

const token = localStorage.getItem("token");
const instance = axios.create({
	baseURL: config.BASE_URL,
	timeout: 5000,
	headers: {"Authorization": `Bearer ${token}`}
});

async function sendRequest(method, url, params, body) {
	try {
		const result = await instance.request({
			method,
			url,
			params,
			data: body
		});
		return {
		  status: result.status,
			data: result.data
		};
	} catch (e) {
		return {
			status: e.response.status,
			data: e.response.data
		};
	}
}
export {RequestTypes, sendRequest};

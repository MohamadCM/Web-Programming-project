import { RequestTypes, sendRequest } from "../utils/request";

async function updateInfo(name, lastname, password, address) {
	const body = {
		_password: password,
		_name: name,
		_lastName: lastname,
		_address: address
	};
	Object.keys(body)
		.forEach((key) => body[key] === undefined && delete body[key]); // removing undefined values
	const result = await sendRequest(RequestTypes.PUT, "/api/users/profile",{}, body);
	if(result.status === 200){
		const token = result.data.token;
		localStorage.setItem("token", token);
		return true;
	}
	else {
		if(result.status !== 422)
			alert(result.data.msg + "\n" + result.data.message || "");
		return false;
	}
}
async function getInfo() {
	const response = await sendRequest(RequestTypes.GET, "/api/users/profile");
	if(response.status === 200) {
	  const profile = response.data.profile;
		return {
			address: profile._address,
			name: profile._name,
			lastName: profile._lastName,
			credit: profile._credit
		};
	}
	else {
		alert("خطایی به وجود آمده است" + "\n" + response.data.msg + "\n" + response.data.message || "");
		return {};
	}
}
async function increaseCredit() {
	const result = await sendRequest(RequestTypes.PUT, "/api/users/profile/credit");
	if(result.status === 200){
		return true;
	}
	else {
		if(result.status !== 422)
			alert("خطایی به وجود آمده است" + "\n" + result.data.msg + "\n" + result.data.message || "");
		return false;
	}
}
export default {updateInfo, getInfo, increaseCredit};

import { RequestTypes, sendRequest } from "../utils/request";
import jwt from "jsonwebtoken";

async function isLoggedIn() {
	const token = localStorage.getItem("token");
	if(!token)
		return false;
	const result = await sendRequest(RequestTypes.GET, "/api/users/profile",{}, {});
	if(result.status === 401)
	  return false;
	return jwt.decode(token);
}

async function login(email, password){
	const result = await sendRequest(RequestTypes.POST, "/api/users/auth",{}, {
	  _username: email,
		_password: password
	});
	if(result.status === 200) {
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

function logOut(){
	localStorage.removeItem("token");
	location.reload();
}

async function signup(email, password, name, lastname, address){
	const result = await sendRequest(RequestTypes.POST, "/api/users/auth/register",{},
		{
			_username: email,
			_password: password,
			_name: name,
			_lastName: lastname,
			_address: address
		});
	if(result.status === 200 || result.status === 201) {
		const token = result.data.token;
		localStorage.setItem("token", token);
		return true;
	}
	else {
		console.log(result.status);
		if(result.status !== 422)
			alert(result.data.msg + "\n" + result.data.message || "");
		return false;
	}
}

function updateInfo(name, lastname, password, address){
	if(name === "abcd")
		return false;
	return true;
}
export default { isLoggedIn, login, logOut, signup, updateInfo };

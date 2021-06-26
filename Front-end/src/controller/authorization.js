import { RequestTypes, sendRequest } from "../utils/request";

function isLoggedIn() {
	const a = Math.random() * 10;
	return a >= 5;
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
	  console.log(result.status);
	  if(result.status !== 422)
	    alert(result.data.msg + "\n" + result.data.message || "");
		return false;
	}
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
export default { isLoggedIn, login, signup, updateInfo };

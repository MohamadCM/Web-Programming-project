function isLoggedIn() {
	const a = Math.random() * 10;
	return a >= 5;
}
function login(email, password){
	if(email === "a@b.com" && password === "abcd1234")
		return true;
	return false;
}
function signup(email, password, name, lastname, address){
	if(email === "a@b.com")
		return false;
	return true;
}
export default { isLoggedIn, login, signup };

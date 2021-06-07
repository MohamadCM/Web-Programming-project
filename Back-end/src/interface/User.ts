// General User Interface
interface User {
	_username: string
	_password: string
	verify: () => boolean
	getToken: () => string
}

export { User };

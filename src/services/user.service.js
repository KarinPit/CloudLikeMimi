import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'user'

export const userService = {
	login,
	logout,
	getLoggedinUser,
	saveLocalUser,
	getUser,
	getById,
	remove,
	update,
	getEmptyUser
}

window.userService = userService;
_createUser()

function getUser() {
	return storageService.query(STORAGE_KEY_USER_DB)
}

async function getById(userId) {
	const user = await storageService.get(STORAGE_KEY_USER_DB, userId)
	return user
}

function remove(userId) {
	return storageService.remove(STORAGE_KEY_USER_DB, userId)
}

async function update(userToUpdate) {
	const user = await getById(userToUpdate.id)

	const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, { ...user, ...userToUpdate })
	if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser)
	return updatedUser
}

function getEmptyUser() {
	return {
		username: '',
		fullname: '',
		password: '',
		imgUrl: '',
	}
}

// Auth functions

async function login(userCred) {
	const users = await storageService.query(STORAGE_KEY_USER_DB)
	const user = users.find(user => user.username === userCred.username)

	if (!user) {
		throw new Error('User not found')
	}

	if (user.password !== userCred.password) {
		throw new Error('Incorrect password')
	}

	return saveLocalUser(user)
}

async function signup(userCred) {
	// Adding "Server data"
	if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	const user = await storageService.post(STORAGE_KEY_USER_DB, userCred)
	return saveLocalUser(user)
}


async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
	user = { id: user.id, fullname: user.fullname, imgUrl: user.imgUrl }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function _createUser() {
	const users = await getUser()
	const usernameToCheck = 'ninap'
	const userExists = users?.some(user => user.username === usernameToCheck)

	if (!userExists) {
		await signup({
			fullname: 'Nina Pitlik',
			username: usernameToCheck,
			password: '123456!'
		})
	}
}


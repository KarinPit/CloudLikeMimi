import { userService } from "../../services/user.service.js";

import { SET_USER } from "../reducers/user.reducer.js"

import { store } from "../store.js"



// export async function loadUser() {
//     try {
//         const user = await userService.getUser()
//         store.dispatch({ type: SET_USER, user: user })
//     } catch (err) {
//         console.log('UserActions: err in loadUsers', err)
//     }
// }

export async function getLoggedUser() {
    try {
        const user = await userService.getLoggedinUser()
        store.dispatch({ type: SET_USER, user: user })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}
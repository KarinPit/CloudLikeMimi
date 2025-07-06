import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { loadUser, login } from '../store/actions/user.actions'
import { useSelector } from 'react-redux';


export default function Login() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())

    useEffect(() => {
        loadUser()
    }, [])

    function clearState() {
        setCredentials(userService.getEmptyUser())
    }

    async function onLogin(ev) {
        if (ev) ev.preventDefault()
        const form = ev.target
        const username = form.username.value.trim()
        const password = form.password.value
        if (!username || !password) {
            console.log('Missing username or password')
            return
        }

        try {
            const user = await login({ username, password })
            console.log('Logged in user:', user)
            clearState()
        } catch (err) {
            console.error('Login failed:', err.message)
        }
    }

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form className="login-form" onSubmit={onLogin}>
                <input id="username" name="username" type='text' placeholder='Username' required></input>
                <input id="password" name="password" type="password" placeholder='Enter password' required></input>
                <button>Login</button>
            </form>
        </div>
    )
}
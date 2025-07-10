import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { getLoggedUser, login } from '../store/actions/user.actions'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import showIcon from "../assets/imgs/Login/show.svg"

export default function Login() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const navigate = useNavigate()

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
            clearState()
            setLoginError('')
            navigate("/")
        } catch (err) {
            console.error('Login failed:', err.message)
            setLoginError(err.message)
        }
    }

    return (
        <div className="login-page">
            <div className='login-container'>
                <h1>Login</h1>
                <h2>Welcome! Please enter your details.</h2>
                <form className="login-form" onSubmit={onLogin}>
                    <label for="username">Username:</label>
                    <input onChange={() => setLoginError('')} id="username" name="username" type='text' placeholder='Username' required></input>
                    <label for="password">Password:</label>
                    <div className='password-container'>
                        <input onChange={() => setLoginError('')} id="password" name="password" type={showPassword ? "text" : "password"} placeholder='Enter password' required></input>
                        <img onClick={() => setShowPassword((prev) => !prev)} src={showIcon}></img>
                    </div>
                    <button>Login</button>
                </form>
                <p>{loginError?.toLowerCase()}</p>
            </div>
        </div>
    )
}
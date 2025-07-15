import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { getLoggedUser, login } from '../store/actions/user.actions'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import ForgotPasswordModal from '../cmps/ForgotPasswordModal';
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import showIcon from "../assets/imgs/Login/show.svg"
import { onToggleModal } from '../store/actions/app.actions';

export default function Login() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [showPassword, setShowPassword] = useState(false)
    const [loginError, setLoginError] = useState(null)
    const navigate = useNavigate()
    const modals = useSelector((storeState) => storeState.appModule.modals)

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

    async function onForgotPasswordClick() {
        try {
            onToggleModal('forgotPassword', true)
        }
        catch (err) {
            console.log('Had issues editing folder:\n', err);
        }
    }

    return (
        <div className="login-page">
            <div className='login-container'>
                <h1>Login</h1>
                <h2>Welcome! Please enter your details.</h2>
                <form className="login-form" onSubmit={onLogin}>
                    <input className="username" onChange={() => setLoginError('')} id="username" name="username" type='text' placeholder='Username' required></input>
                    <div className='password-container'>
                        <input onChange={() => setLoginError('')} id="password" name="password" type={showPassword ? "text" : "password"} placeholder='Enter password' required></input>
                        {showPassword ? <EyeOffIcon onClick={() => setShowPassword((prev) => !prev)} /> : <EyeIcon onClick={() => setShowPassword((prev) => !prev)} />}
                    </div>
                    <button>Login</button>
                </form>
                <p className='error-msg'>{loginError?.toLowerCase()}</p>
                <p className="forgot-password" onClick={onForgotPasswordClick}>Forgot password?</p>
                {modals.forgotPassword && <ForgotPasswordModal />}
            </div>
        </div>
    )
}
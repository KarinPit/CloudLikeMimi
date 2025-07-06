import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { loadUsers } from '../store/actions/user.actions'
import { useSelector } from 'react-redux';

export default function Login(props) {
    const users = useSelector(storeState => storeState.userModule.users)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [])


    function clearState() {
        setCredentials(userService.getEmptyUser())
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    async function onLogin(ev) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        await props.onLogin(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(prevIsSignup => !prevIsSignup)
    }

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={onLogin}>
                <input id="username" name="username" type='text' placeholder='Username'></input>
                <input id="passwd" name="passwd" type="password" placeholder='Enter password'></input>
                <button>Login</button>
            </form>
        </div>
    )
}
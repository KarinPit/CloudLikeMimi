import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import FolderFilter from './FolderFilter'
import FileFilter from './FileFilter'

import {
    Menu,
    Search,
    User,
    XIcon,
    HomeIcon,
    FolderIcon,
    SettingsIcon,
    HelpCircleIcon,
    LogOutIcon,
} from 'lucide-react'
import { logout } from '../store/actions/user.actions'
import MenuModal from './MenuModal'
import { useSelector } from 'react-redux'
import { onToggleModal } from '../store/actions/app.actions'


export default function AppHeader() {
    const location = useLocation()
    const userRef = useRef(null)
    const menuRef = useRef(null)
    const [isClickedUser, setIsClickedUser] = useState(false)

    useEffect(() => {
    }, [location])

    useEffect(() => {
        if (isClickedUser) {
            document.addEventListener('mousedown', handleOutsideClickUser)
        } else {
            document.removeEventListener('mousedown', handleOutsideClickUser)
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClickUser)
        }
    }, [isClickedUser])

    function handleOutsideClickUser(ev) {
        if (
            userRef.current &&
            !userRef.current.contains(ev.target) &&
            !ev.target.className.includes("user-icon")
        ) {
            setIsClickedUser(false)
        }
    }

    return (
        <section className="app-header">
            <div className='menu-logo'>
                <button onClick={() => onToggleModal('mainMenu', true)} >
                    <Menu />
                </button>
                <p>Dr. Nina Pitlik</p>

            </div>
            <section className='user-options'>
                {location.pathname == '/' ? <FolderFilter /> : <FileFilter />}
                <div className='user-icon-container'>
                    <User className="user-icon" onClick={() => setIsClickedUser(prev => !prev)} />
                </div>
                {isClickedUser && <div ref={userRef} className='user-menu'>
                    <button onClick={logout}>Log out</button>
                </div>}
            </section>
        </section>
    )
}
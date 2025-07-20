import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import FilterModal from './FilterModal'
import FileFilter from './FileFilter'

import {
    Menu,
    User,
    LogOutIcon,
    Settings
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
                <FilterModal />
                {/* {location.pathname == '/' ? <FolderFilter /> : <FileFilter />} */}
                <div className='user-icon-container'>
                    <User className="user-icon" onClick={() => setIsClickedUser(prev => !prev)} />
                </div>
                {isClickedUser && <div ref={userRef} className='user-menu'>
                    <div className='user-info'>
                        <p>Dr. Nina Pitlik</p>
                        <p>ninpitlik@gmail.com</p>
                    </div>
                    <div className="user-profile-settings">
                        <button>
                            <User />
                            <p>Your Profile</p>
                        </button>
                        <button>
                            <Settings />
                            <p>Settings</p>
                        </button>
                    </div>
                    <div className='logout-container'>
                        <button onClick={logout}>
                            <LogOutIcon />
                            <p>Log out</p>
                        </button>
                    </div>
                </div>}
            </section>
        </section>
    )
}
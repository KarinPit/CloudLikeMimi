import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import FolderFilter from './FolderFilter'
import FileFilter from './FileFilter'

import userIcon from "../assets/imgs/Appheader/user.svg"
import menuIcon from "../assets/imgs/Appheader/menu.svg"
import { logout } from '../store/actions/user.actions'


export default function AppHeader() {
    const location = useLocation()
    const userRef = useRef(null)
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
    }, [location])

    useEffect(() => {
        if (isClicked) {
            document.addEventListener('mousedown', handleOutsideClick)
        } else {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [isClicked])

    function handleOutsideClick(ev) {
        if (
            userRef.current &&
            !userRef.current.contains(ev.target) &&
            !ev.target.className.includes("user-icon")
        ) {
            setIsClicked(false)
        }
    }

    return (
        <section className="app-header">
            <nav>
                <button>
                    <img src={menuIcon}></img>
                </button>
                <NavLink to="/">Dr Nina Pitlik</NavLink>
            </nav>
            <section className='user-options'>
                {location.pathname == '/' ? <FolderFilter /> : <FileFilter />}
                <img className="user-icon" src={userIcon} onClick={() => setIsClicked(prev => !prev)}></img>
                {isClicked && <div ref={userRef} className='user-menu'>
                    <button onClick={logout}>Log out</button>
                </div>}
            </section>
        </section>
    )
}
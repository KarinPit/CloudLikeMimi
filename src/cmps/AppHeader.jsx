import { NavLink, useLocation } from 'react-router-dom'

import FolderFilter from './FolderFilter'
import FileFilter from './FileFilter'

import userIcon from "../assets/imgs/Appheader/user.svg"
import menuIcon from "../assets/imgs/Appheader/menu.svg"
import { useEffect } from 'react'

export default function AppHeader() {
    const location = useLocation()

    useEffect(() => {
    }, [location])

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
                <img src={userIcon}></img>
            </section>
        </section>
    )
}
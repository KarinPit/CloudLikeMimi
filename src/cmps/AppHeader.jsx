import { NavLink } from 'react-router-dom'

import FolderFilter from './FolderFilter'

import userIcon from "../assets/imgs/Appheader/user.svg"
import menuIcon from "../assets/imgs/Appheader/menu.svg"

export default function AppHeader() {


    return (
        <section className="app-header">
            <nav>
                <button>
                    <img src={menuIcon}></img>
                </button>
                <NavLink to="/">Dr Nina Pitlik</NavLink>
            </nav>
            <section className='user-options'>
                <FolderFilter />
                <img src={userIcon}></img>
            </section>
        </section>
    )
}
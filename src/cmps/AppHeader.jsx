import { useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import userIcon from "../assets/imgs/Appheader/user.svg"
import menuIcon from "../assets/imgs/Appheader/menu.svg"
import searchIcon from "../assets/imgs/Appheader/search.svg"

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
                <button>
                    <img src={searchIcon}></img>
                </button>
                <img src={userIcon}></img>
            </section>
        </section>
    )
}

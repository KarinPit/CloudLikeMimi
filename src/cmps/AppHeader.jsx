import { useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import userIcon from "../assets/imgs/Appheader/user.svg"

export default function AppHeader() {

    return (
        <section className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/link1">Link1</NavLink>
                <NavLink to="/Link2">Link2</NavLink>
            </nav>
            <section className='user-options'>
                <img src={userIcon}></img>
                {/* <button>Login</button> */}
            </section>
        </section>
    )
}

import { useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'


export default function Footer() {

    return (
        <section className="footer">
            <section>
                <p>Developed by Karin Pitlik</p>
            </section>
            <nav>
                {/* <NavLink to="/">Link1</NavLink>
                <NavLink to="/link1">Link2</NavLink>
                <NavLink to="/Link2">Link3</NavLink> */}
            </nav>
        </section>
    )
}

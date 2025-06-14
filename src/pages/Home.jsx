import { useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'

import smiling_thumbs_up from "../assets/imgs/Home/smiling_thumbs_up.svg"

export default function Home() {

    return (
        <section className="home">
            <img src={smiling_thumbs_up}></img>
            <h1>Starter project ready!</h1>
        </section>
    )
}

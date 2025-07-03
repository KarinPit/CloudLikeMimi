import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import userIcon from "../assets/imgs/Appheader/user.svg"
import menuIcon from "../assets/imgs/Appheader/menu.svg"
import searchIcon from "../assets/imgs/Appheader/search.svg"

export default function AppHeader() {
    const [isClicked, setIsClicked] = useState(false)
    const inputRef = useRef(null)

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


    function handleHover() {
        setIsClicked(true)
    }

    function handleOutsideClick(ev) {
        const btn = ev.target.closest('button')

        if (
            inputRef.current &&
            !inputRef.current.contains(ev.target) &&
            !btn?.className.includes('search-button')
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
                <form className={isClicked ? 'show' : 'hide'}>
                    {/* <form className={isClicked ? 'show-form' : ''} onMouseLeave={onHandleMouseLeave}> */}
                    <input ref={inputRef} id="folder-name" name="folder-name" type='text' placeholder='search folder...'></input>
                </form>

                <button className={`search-button ${!isClicked ? 'show' : ''}`} onMouseEnter={handleHover}>
                    <img src={searchIcon}></img>
                </button>

                <img src={userIcon}></img>
            </section>
        </section>
    )
}

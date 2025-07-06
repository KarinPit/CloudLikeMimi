import React, { useEffect, useRef, useState } from 'react'
// import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../customHooks/useForm'
import searchIcon from "../assets/imgs/Appheader/search.svg"
import { setFilterBy } from '../store/actions/file.actions'
import { useSearchParams } from 'react-router-dom'
import { fileService } from '../services/file.service'


export default function FileFilter() {
    const filterBy = useSelector((storeState) => storeState.fileModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)
    const [isClicked, setIsClicked] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        setFilterBy(fileService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
    }, [filterBy])

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
        const btn = ev.target.closest('button')

        if (
            inputRef.current &&
            !inputRef.current.contains(ev.target) &&
            !btn?.className.includes('search-button')
        ) {
            setIsClicked(false)
        }
    }

    function onSetFilter() {
        setFilterBy(filterByToEdit)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <>
            <form className={`file-filter ${isClicked ? 'show' : 'hide'}`} onSubmit={onSubmitFilter}>
                <input ref={inputRef} id="name" name="name" type='text' placeholder='search file...' value={filterBy.name || ''} onChange={handleChange}></input>
            </form>

            <button className={`search-button ${!isClicked ? 'show' : ''}`} onClick={() => setIsClicked(true)}>
                <img src={searchIcon}></img>
            </button>
        </>
    )
}

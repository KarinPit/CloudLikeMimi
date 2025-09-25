import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { useForm } from '../customHooks/useForm'
import { loadAllFiles, setFilterBy } from '../store/actions/file.actions'
import { fileService } from '../services/file.service'

import {
    Search,
    X
} from 'lucide-react'

export default function FilterModal() {
    const filterBy = useSelector((storeState) => storeState.fileModule.filterBy)
    const isLoading = useSelector((storeState) => storeState.fileModule.isLoading)
    const searchResults = useSelector((storeState) => storeState.fileModule.files)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)
    const [isClicked, setIsClicked] = useState(false)
    const [recentSearches, setRecentSearches] = useState([])
    const filterRef = useRef(null)

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
        if (filterRef.current && !filterRef.current.contains(ev.target)) {
            setIsClicked(false)
        }
    }

    function onSetFilter() {
        setFilterBy(filterByToEdit)
        loadAllFiles(filterByToEdit)
    }

    return (
        <div className={`file-filter ${isClicked ? 'expanded' : 'minimized'}`} ref={filterRef}>
            <Search size={20} className="text-gray-400 mr-3" onClick={() => setIsClicked(true)} />

            {isClicked && <>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Search documents..."
                    value={filterBy.name || ''}
                    onChange={handleChange}
                />

                <button onClick={() => setIsClicked(false)}>
                    <X size={18} />
                </button>
            </>}


        </div>
    )
}
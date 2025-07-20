import React, { useEffect, useRef, useState } from 'react'
// import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { useForm } from '../customHooks/useForm'
import { setFilterBy } from '../store/actions/folder.actions'
import { folderService } from '../services/folder.service'

import {
    Search,
    ClockIcon,
    XIcon
} from 'lucide-react'

export default function FilterModal() {
    const filterBy = useSelector((storeState) => storeState.folderModule.filterBy)
    const searchResults = useSelector((storeState) => storeState.folderModule.folderData)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)
    const [isClicked, setIsClicked] = useState(false)
    const [recentSearches, setRecentSearches] = useState([])
    const modalRef = useRef(null)

    useEffect(() => {
        setFilterBy(folderService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
    }, [filterBy])

    useEffect(() => {
        console.log(recentSearches)
    }, [recentSearches])

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
            modalRef.current &&
            !modalRef.current.contains(ev.target) &&
            !btn?.className.includes('search-button')
        ) {
            setIsClicked(false)
        }
    }

    function onSetFilter() {
        setFilterBy(filterByToEdit)
    }

    // function onSubmitFilter(ev) {
    //     ev.preventDefault()
    //     onSetFilter(filterByToEdit)
    // }

    return (
        <>
            <button className="search-button" onClick={() => setIsClicked(true)}>
                <Search />
            </button>

            <div className={`folder-filter ${isClicked ? 'show' : ''}`} ref={modalRef}>
                <div className="filter-container">
                    <div className='input-container'>
                        <Search className='search-icon' />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Search documents..."
                            value={filterBy.name || ''}
                            onChange={handleChange}
                        />
                        {filterBy.name && (
                            <button onClick={() => {
                                const updatedFilter = { target: { name: 'name', value: '', type: 'text' } }
                                handleChange(updatedFilter)
                                setRecentSearches((prev) => {
                                    const updatedSearches = [filterBy.name, ...prev.filter(val => val !== filterBy.name)]
                                    return updatedSearches.slice(0, 4)
                                })
                            }}>
                                <XIcon />
                            </button>
                        )}
                    </div>

                    <div className="search-history-container">
                        {!filterBy.name && (
                            <>
                                <div>
                                    <ClockIcon />
                                    <h3>Recent searches</h3>
                                </div>
                                <div>
                                    {recentSearches?.map((term, i) => (
                                        <button key={i} onClick={() => {
                                            const updatedFilter = { target: { name: 'name', value: term, type: 'text' } }
                                            handleChange(updatedFilter)
                                        }} >
                                            <Search />
                                            <p>{term}</p>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        {filterBy.name && (
                            <div className='search-results'>
                                <h3>
                                    {searchResults.length > 0
                                        ? `${searchResults.length} results found`
                                        : 'No results found'}
                                </h3>
                                {searchResults.length > 0 ? (
                                    <div className="file-container">
                                        {searchResults.map((doc, idx) => (
                                            <div
                                                key={idx}
                                                className="file-row"
                                            >
                                                <div className="file-icon">
                                                    {doc.icon}
                                                </div>
                                                <div className="file-info">
                                                    <p className="file-name">{doc.name}</p>
                                                    <p className="file-date-modified">
                                                        {doc.typeLabel} • {doc.dateModified}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">
                                            No documents found matching "{filterBy.name}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    )
}

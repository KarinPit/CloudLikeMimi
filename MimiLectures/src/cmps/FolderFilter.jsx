import React, { useEffect, useRef, useState } from 'react'
// import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { utilService } from '../services/util.service'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../customHooks/useForm'
import searchIcon from "../assets/imgs/Appheader/search.svg"
import { setFilterBy } from '../store/actions/folder.actions'
import { useSearchParams } from 'react-router-dom'
import { folderService } from '../services/folder.service'
import {
    Search,
    ClockIcon,
    XIcon
} from 'lucide-react'

export default function FolderFilter() {
    const filterBy = useSelector((storeState) => storeState.folderModule.filterBy)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, handleChange] = useForm(filterBy, onSetFilter)
    const [isClicked, setIsClicked] = useState(false)
    const [recentSearches, setSearchQuery] = useState([])
    const modalRef = useRef(null)

    useEffect(() => {
        setFilterBy(folderService.getFilterFromParams(searchParams))
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

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return (
        <>
            {/* <form className={`folder-filter ${isClicked ? 'show' : 'hide'}`} onSubmit={onSubmitFilter}>
                <input ref={inputRef} id="name" name="name" type='text' placeholder='search folder...' value={filterBy.name || ''} onChange={handleChange}></input>
            </form> */}

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
                            <button onClick={() => handleChange({ target: { name: 'name', value: '', type: 'text' } })}>
                                <XIcon />
                            </button>
                        )}
                    </div>

                    <div className="search-history-container">
                        {!filterBy.name && (
                            <>
                                <div>
                                    <ClockIcon size={16} className="mr-2" />
                                    <h3>Recent searches</h3>
                                </div>
                                <div className="space-y-1">
                                    {recentSearches?.map((term, i) => (
                                        <button
                                            key={i}
                                            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 flex items-center"
                                            onClick={() => setSearchQuery(term)}
                                        >
                                            <Search size={16} className="text-gray-400 mr-3" />
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                        {/* {filterBy.name && (
                            <div className="p-4">
                                <h3 className="text-sm font-medium text-gray-500 mb-3">
                                    {searchResults.length > 0
                                        ? `${searchResults.length} results found`
                                        : 'No results found'}
                                </h3>
                                {searchResults.length > 0 ? (
                                    <div className="space-y-1">
                                        {searchResults.map((doc) => (
                                            <div
                                                key={doc.id}
                                                className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                            >
                                                <div className="p-1.5 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                                                    {doc.icon}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{doc.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {doc.typeLabel} • {doc.dateModified}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">
                                            No documents found matching "{searchQuery}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </>
    )
}

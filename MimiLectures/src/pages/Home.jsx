import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import LoadingAnim from '../cmps/LoadingAnim.jsx';
import { showErrorMsg } from '../services/event-bus.service.js';
import { removeFolder, saveFolder } from "../store/actions/folder.actions.js"

import { loadFoldersData } from "../store/actions/folder.actions.js"
import { onToggleModal } from '../store/actions/app.actions.js';
import { NavLink } from 'react-router-dom';

import {
    FolderIcon, Edit2Icon, Trash2Icon, XIcon
} from 'lucide-react'


export default function Home() {
    const filterBy = useSelector((storeState) => storeState.folderModule.filterBy)
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const normalScreen = useSelector((storeState) => storeState.appModule.normalScreen)
    const wideScreen = useSelector((storeState) => storeState.appModule.wideScreen)
    const folderData = useSelector((storeState) => storeState.folderModule.folderData)
    const isLoading = useSelector((storeState) => storeState.folderModule.isLoading)
    const [hoveredFolderId, setHoveredFolderId] = useState(null)
    const [currentFolderToEdit, setCurrentFolderToEdit] = useState(null)
    const [currentFolderToDelete, setCurrentFolderToDelete] = useState(null)

    function arrangeFolders(colNum) {
        return folderData.map((folder, idx) => {
            var shiftedIdx = idx + 1
            const colClass = `col-${(shiftedIdx % colNum) || colNum}`;

            return (
                <NavLink key={shiftedIdx} to={`/folder/${folder.id}`} onMouseEnter={() => setHoveredFolderId(folder.id)} onMouseLeave={() => setHoveredFolderId(null)}>
                    <div className={`folder ${colClass} mobile`}>
                        <div className='svg-container'>
                            <FolderIcon />
                        </div>
                        {currentFolderToEdit?.id == folder.id &&
                            <div className='edit-form'>
                                <form>
                                    <input type='text' value={currentFolderToEdit.name} onClick={(ev) => ev.preventDefault()} onChange={(ev) => setCurrentFolderToEdit((prev) => ({ ...prev, name: ev.target.value }))}></input>
                                    <div className='btn-container'>
                                        <button type='button' onClick={(ev) => onEditfFolder(ev)}>Save</button>
                                        <button type='button' onClick={(ev) => { ev.preventDefault(); setCurrentFolderToEdit(null) }}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        }

                        {currentFolderToDelete?.id == folder.id &&
                            <div className='delete-form'>
                                <p>Delete "{currentFolderToDelete.name}"?</p>
                                <button className='close-btn'>
                                    <XIcon />
                                </button>
                                <div className='btn-container'>
                                    <button onClick={(ev) => onRemovefFolder(ev)}>Delete</button>
                                    <button onClick={(ev) => { ev.preventDefault(); setCurrentFolderToDelete(null) }}>Cancel</button>
                                </div>
                            </div>
                        }

                        {!(currentFolderToEdit?.id === folder.id || currentFolderToDelete?.id === folder.id) && (
                            <p>{folder.name}</p>
                        )}
                    </div >

                    <div className={`folder-options ${hoveredFolderId === folder.id ? 'show' : ''}`}>
                        <button onClick={(ev) => {
                            ev.preventDefault()
                            setCurrentFolderToEdit(folder)
                        }}>
                            <Edit2Icon />
                        </button>
                        <button onClick={(ev) => {
                            ev.preventDefault()
                            setCurrentFolderToDelete(folder)
                        }}>
                            <Trash2Icon />
                        </button>
                    </div>
                </NavLink >)
        })
    }

    async function onAddFolder(ev) {
        try {
            onToggleModal('addFolder', true)
            showSuccessMsg('Robot added successfully')
        } catch (err) {
            console.log('Had issues adding robot', err);
            showErrorMsg('Could not add robot')
        }
    }

    async function onEditfFolder(ev) {
        ev.preventDefault()
        try {
            await saveFolder(currentFolderToEdit)
            setCurrentFolderToEdit(null)
        }
        catch (err) {
            console.log('Error in updating folder: ', err);
        }
    }

    async function onRemovefFolder(ev) {
        ev.preventDefault()
        try {
            await removeFolder(currentFolderToDelete.id)
            setCurrentFolderToDelete(null)
        }
        catch (err) {
            console.log('Error in updating folder: ', err);
        }
    }

    useEffect(() => {
        loadFoldersData()
    }, [filterBy])

    if (isLoading) return <section className="home page-grid">
        <div className='header-with-button'>
            <h1>My Folders</h1>
        </div>

        <div className='folder-gallery loading'>
            <LoadingAnim />
        </div>
    </section>

    return (
        <section className="home page-grid">
            <div className='header-with-button'>
                <h1>My Folders</h1>
                <div className='main-button add-folder'>
                    <button onClick={onAddFolder}>+ Add folder</button>
                </div>
            </div>

            <div className='folder-gallery'>
                {currentWidth <= smallScreen ? arrangeFolders(2)
                    : currentWidth > smallScreen && currentWidth <= normalScreen ? arrangeFolders(3)
                        : currentWidth > normalScreen && currentWidth <= wideScreen ? arrangeFolders(4)
                            : arrangeFolders(7)}
            </div>
        </section>
    )
}

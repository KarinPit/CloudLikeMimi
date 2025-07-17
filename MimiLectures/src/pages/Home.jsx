import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import LoadingAnim from '../cmps/LoadingAnim.jsx';
import { showErrorMsg } from '../services/event-bus.service.js';
import { saveFolder } from "../store/actions/folder.actions.js"

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
                        <p>{folder.name}</p>
                    </div>
                    <div className={`folder-options ${hoveredFolderId === folder.id ? 'show' : ''}`}>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                // handleEdit(folder.id, folder.name)
                            }}
                        >
                            <Edit2Icon />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                // setShowDeleteConfirm(folder.id)
                            }}
                        >
                            <Trash2Icon />
                        </button>
                    </div>
                </NavLink>)
        })
    }

    async function onAddFolder() {
        try {
            onToggleModal('addFolder', true)
            showSuccessMsg('Robot added successfully')
        } catch (err) {
            console.log('Had issues adding robot', err);
            showErrorMsg('Could not add robot')
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

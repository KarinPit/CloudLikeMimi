import { useEffect } from 'react'
import { useSelector } from 'react-redux';

import LoadingAnim from '../cmps/LoadingAnim.jsx';
import { showErrorMsg } from '../services/event-bus.service.js';
import { saveFolder } from "../store/actions/folder.actions.js"

import { loadFoldersData } from "../store/actions/folder.actions.js"
import { onToggleModal } from '../store/actions/app.actions.js';
import { NavLink } from 'react-router-dom';


export default function Home() {
    const filterBy = useSelector((storeState) => storeState.folderModule.filterBy)
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const normalScreen = useSelector((storeState) => storeState.appModule.normalScreen)
    const wideScreen = useSelector((storeState) => storeState.appModule.wideScreen)
    const folderData = useSelector((storeState) => storeState.folderModule.folderData)
    const isLoading = useSelector((storeState) => storeState.folderModule.isLoading)


    function arrangeFolders(colNum) {
        return folderData.map((folder, idx) => {
            var shiftedIdx = idx + 1
            const colClass = `col-${(shiftedIdx % colNum) || colNum}`;

            return (
                <NavLink key={shiftedIdx} to={`/folder/${folder.id}`}>
                    <div className={`folder ${colClass} mobile`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 19.5" id="files" style={{ color: folder.color }}>
                            <path fill="currentColor" d="M19 21.5H5a3.003 3.003 0 0 1-3-3v-13a3.003 3.003 0 0 1 3-3h4.559a2.996 2.996 0 0 1 2.845 2.05l.317.95H19a3.003 3.003 0 0 1 3 3v10a3.003 3.003 0 0 1-3 3Z"></path>
                        </svg>
                        <p>{folder.name}</p>
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

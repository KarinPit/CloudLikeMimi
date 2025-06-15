import { useEffect } from 'react'
import { useSelector } from 'react-redux';

// import { utilService } from '../services/util.service'
import Lottie from 'react-lottie';
import { showErrorMsg } from '../services/event-bus.service.js';
import { saveFolder } from "../store/actions/folder.actions.js"

import { loadFoldersData } from "../store/actions/folder.actions.js"
import animationData from '../assets/animations/Loading.json';


export default function Home() {
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const normalScreen = useSelector((storeState) => storeState.appModule.normalScreen)
    const wideScreen = useSelector((storeState) => storeState.appModule.wideScreen)
    const folderData = useSelector((storeState) => storeState.folderModule.folderData)
    const isLoading = useSelector((storeState) => storeState.folderModule.isLoading)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    function arrangeFolders(colNum) {
        return folderData.map((folder, idx) => {
            var shiftedIdx = idx + 1
            const colClass = `col-${(shiftedIdx % colNum) || colNum}`;

            return (<div key={shiftedIdx} className={`folder ${colClass} mobile`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="files" style={{ color: folder.color }}>
                    <path fill="currentColor" d="M19 21.5H5a3.003 3.003 0 0 1-3-3v-13a3.003 3.003 0 0 1 3-3h4.559a2.996 2.996 0 0 1 2.845 2.05l.317.95H19a3.003 3.003 0 0 1 3 3v10a3.003 3.003 0 0 1-3 3Z"></path>
                </svg>
                <p>{folder.name}</p>
            </div>)
        })
    }

    async function onAddFolder() {
        try {
            await saveFolder({})
            showSuccessMsg('Robot added successfully')
        } catch (err) {
            console.log('Had issues adding robot', err);
            showErrorMsg('Could not add robot')
        }
    }

    useEffect(() => {
        loadFoldersData()
    }, [])

    if (isLoading) return <section className="home">
        <div className='folder-header'>
            <div className='main-title'>
                <h1>My Folders</h1>
                <p>All your files, organized.</p>
            </div>
            <div className='add-folder'>
                <button onClick={onAddFolder}>+ Add folder</button>
            </div>
        </div>

        <div className='folder-gallery loading'>
            <div className='lotti-container'>
                <Lottie
                    options={defaultOptions}
                />
            </div>
        </div>
    </section>

    return (
        <section className="home">
            <div className='folder-header'>
                <div className='main-title'>
                    <h1>My Folders</h1>
                    <p>All your files, organized.</p>
                </div>
                <div className='add-folder'>
                    <button onClick={onAddFolder}>+ Add folder</button>
                </div>
            </div>

            <div className='folder-gallery'>
                {currentWidth <= smallScreen ? arrangeFolders(2)
                    : currentWidth > smallScreen && currentWidth <= normalScreen ? arrangeFolders(3)
                        : currentWidth > normalScreen && currentWidth <= wideScreen ? arrangeFolders(4)
                            : arrangeFolders(5)}
            </div>
        </section>
    )
}

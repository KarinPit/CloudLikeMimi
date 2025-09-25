import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"

import UploadWidget from '../cmps/UploadWidget'
import { getFilesByFolderId, removeFile, setCurrentFile, setFilterBy } from "../store/actions/file.actions"

import LoadingAnim from "../cmps/LoadingAnim"
import { onToggleModal } from "../store/actions/app.actions"
import { loadFolderById } from "../store/actions/folder.actions"

import {
    Download, Trash2, Pencil, FileTextIcon, FileType2Icon, PresentationIcon, FileSpreadsheetIcon, LinkIcon, FolderIcon, CircleAlert,
    Link
} from 'lucide-react'
import { fileService } from "../services/file.service"
import { useSearchParams } from "react-router-dom"


export default function FolderIndex() {
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const files = useSelector((storeState) => storeState.fileModule.files)
    const filterBy = useSelector((storeState) => storeState.fileModule.filterBy)
    const currentFolder = useSelector((storeState) => storeState.folderModule.currentFolder)
    const isLoading = useSelector((storeState) => storeState.folderModule.isLoading)
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [onEditFile, setOnEditFile] = useState(true)
    const [onClickRemove, setOnClickRemove] = useState(null)

    useEffect(() => {
        setFilterBy(fileService.getFilterFromParams(searchParams))
    }, [])

    useEffect(() => {
        loadFolderById(params.folderId)
        getFilesByFolderId(params.folderId)
    }, [params.folderId])

    useEffect(() => {
        setSearchParams(filterBy)
        getFilesByFolderId(params.folderId)
    }, [filterBy])

    async function onEditFolder() {
        try {
            onToggleModal('editFolder', true)
        }
        catch (err) {
            console.log('Had issues editing folder:\n', err);
        }
    }

    // async function downloadFile(file) {
    //     const res = await fetch(`/api/download?publicId=${encodeURIComponent(file.publicId)}&ext=${file.extension}`);
    //     const { url } = await res.json();
    //     window.location.href = url; // browser triggers download
    // }

    // async function loadFiles(folderId) {
    //     try {
    //         await getFilesByFolderId(folderId)
    //     }
    //     catch (err) {
    //         console.log('Had issues loading files\nError:', err);
    //     }
    // }

    // async function uploadFile(ev) {
    //     try {
    //         await uploadFileToCloud(ev)
    //     }
    //     catch (err) {
    //         console.log('Had issues loading files\nError:', err);
    //     }
    // }

    // async function downloadFile() {
    //     console.log('downloading file');
    // }

    function getInfoFromExtension(extension) {
        switch (extension) {
            case 'docx':
                return { label: 'Word Document', icon: <FileTextIcon className='word-icon' /> }
            case 'txt':
                return { label: 'Text Document', icon: <FileType2Icon className='text-icon' /> }
            case 'pptx':
                return { label: 'PowerPoint Presentation', icon: <PresentationIcon className='pptx-icon' /> }
            case 'pdf':
                return { label: 'PDF Document', icon: <FileTextIcon className='pdf-icon' /> }
            case 'xlsx':
                return { label: 'Excel Spreadsheet', icon: <FileSpreadsheetIcon className='xlsx-icon' /> }
            case 'jpg':
                return { label: 'Excel Spreadsheet', icon: <FileSpreadsheetIcon className='xlsx-icon' /> }
            case 'psd':
                return { label: 'Excel Spreadsheet', icon: <FileSpreadsheetIcon className='xlsx-icon' /> }
            case 'mp3':
                return { label: 'Excel Spreadsheet', icon: <FileSpreadsheetIcon className='xlsx-icon' /> }
            case 'mp4':
                return { label: 'Excel Spreadsheet', icon: <FileSpreadsheetIcon className='xlsx-icon' /> }
            case 'url':
                return { label: 'Web Link', icon: <LinkIcon className='web-icon' /> }
            case 'zip':
                return { label: 'A folder', icon: <FolderIcon className='folder-icon' /> }
            case 'folder':
                return { label: 'A folder', icon: <FolderIcon className='folder-icon' /> }
            default:
                return { label: 'Web Link', icon: <LinkIcon className='web-icon' /> }
        }
    }

    // loading animation until data is collected
    if (isLoading || !currentFolder) return (
        <section className="folder-index page-grid">
            <div className="header-with-button">
            </div>
            <div className="folder-info loading">
                <LoadingAnim />
            </div>
        </section>
    )

    return (
        <>
            <div className="folder-index title-container">
                <div>
                    <h1>{currentFolder.name}</h1>
                    <button className="edit-title"
                        onClick={() => onToggleModal('editFoldetTitle', true)}
                        aria-label="Edit title">
                        <Pencil />
                    </button>
                </div>
                {/* <button
                    onClick={() => onToggleModal('addFile', true)}
                > */}
                {/* <p>+ Add file</p> */}
                {/* <UploadWidget folderId={currentFolder.id} /> */}
                {/* </button> */}

                <UploadWidget folderId={currentFolder.id} />
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                File Name
                            </th>
                            <th>
                                Type
                            </th>
                            <th>
                                Date Modified
                            </th>
                            <th>
                                Size
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((doc) => (
                            <tr key={doc.id}>
                                {/* {console.log(doc)} */}
                                <td>
                                    <div>
                                        <div>
                                            {getInfoFromExtension(doc.extension).icon}
                                        </div>
                                        <p>{doc.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p>{doc.extension}</p>
                                        <p>{getInfoFromExtension(doc.extension).label}</p>
                                    </div>
                                </td>
                                <td>{doc.dateModified}</td>
                                <td>{doc.size ? doc.size : '—'}</td>
                                <td>
                                    <div>
                                        {onEditFile && (
                                            <button
                                                title={`Edit ${doc.extension === 'Folder' ? 'folder' : 'file'} name`}
                                                onClick={() => {
                                                    setCurrentFile(doc)
                                                    onToggleModal('editFileTitle', true)
                                                }}
                                            // onClick={() =>
                                            //     onEditFile({
                                            //         id: doc.id,
                                            //         name: doc.name,
                                            //         type: doc.type,
                                            //         icon: doc.icon,
                                            //     })
                                            // }
                                            >
                                                <Pencil size={16} />
                                            </button>
                                        )}
                                        <button title="Download">
                                            <Download size={16} onClick={() => downloadFile(doc.publicId)} />
                                        </button>
                                        <div className="delete-container">
                                            <button title="Delete" onClick={() => setOnClickRemove(doc.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                            {onClickRemove == doc.id &&
                                                <div className="remove-file-modal">
                                                    <div>
                                                        <CircleAlert />
                                                        <div>
                                                            <p>Delete file?</p>
                                                            <p>Are you sure you want to delete {doc.name}? This action cannot be undone.</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => setOnClickRemove(null)}>Cancel</button>
                                                        <button onClick={() => removeFile(doc.id)}>Delete</button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}



// return (
//     <section className="folder-index page-grid">
//         <div className="header-with-button">
//             <div className="edit-folder">
//                 <h1>{`${currentFolder.name}`}</h1>
//                 <button onClick={onEditFolder}>
//                     <img src={editIcon}></img>
//                 </button>
//             </div>
//             <div className='main-button add-file'>
//                 <UploadWidget folderId={currentFolder.id} />
//             </div>
//         </div>
//         {files.length > 0 ? currentWidth <= smallScreen ?
//             // layout for small screens
//             <div className="folder-info mobile">
//                 {files.map((file, idx) => {
//                     return (
//                         <div key={idx} className="file-info">
//                             <div className="img-container">
//                                 {getExtensionSVG(file.extension, "file-img")}
//                                 <button>
//                                     <img className="vert-dots" src={vertDotsIcon}></img>
//                                 </button>
//                             </div>
//                             <p>{file.name}</p>
//                         </div>
//                     )
//                 })}

//             </div>
//             :
//             // layout for normal and above screens
//             <div className="folder-info">
//                 <div className="file-info">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>File Name</th>
//                                 <th>Type</th>
//                                 <th>Date Modified</th>
//                                 <th>Size</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {files.map((file, idx) => {
//                                 return (<tr key={idx}>
//                                     <td>{getExtensionSVG(file.extension, "file-img")} {file.name}</td>
//                                     <td>{file.extension}</td>
//                                     <td>{file.dateModified}</td>
//                                     <td>{file.size}</td>
//                                     <td>
//                                         <div className="file-actions">
//                                             <button onClick={() => downloadFile('abcd123')}>
//                                                 <img src={downloadIcon}></img>
//                                             </button>
//                                             <button onClick={() => deleteFile(file.id)}>
//                                                 <img src={trashIcon}></img>
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>)
//                             })}
//                         </tbody>
//                     </table>

//                 </div>

//             </div>
//             : <div className="empty-folder">
//                 <img src={EmptyFolder}></img>
//                 <p>No files to show...</p>
//             </div>
//         }
//     </section >
// )
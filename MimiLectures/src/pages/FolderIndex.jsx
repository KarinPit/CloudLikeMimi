import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"

import UploadWidget from '../cmps/UploadWidget'
// import { folderService } from "../services/folder.service"
import { deleteFile, getFilesByFolderId, uploadFileToCloud } from "../store/actions/file.actions"

import LoadingAnim from "../cmps/LoadingAnim"
import editIcon from "../assets/imgs/FolderIndex/edit.svg"
import downloadIcon from "../assets/imgs/FolderIndex/download.svg"
import trashIcon from "../assets/imgs/FolderIndex/trash.svg"
import vertDotsIcon from "../assets/imgs/FolderIndex/dots.svg"
import docxIcon from "../assets/imgs/FolderIndex/docx.svg"
import txtIcon from "../assets/imgs/FolderIndex/txt.svg"
import pdfIcon from "../assets/imgs/FolderIndex/pdf.svg"
import xlsxIcon from "../assets/imgs/FolderIndex/xlsx.svg"
import linkIcon from "../assets/imgs/FolderIndex/link.svg"
import EmptyFolder from "../assets/imgs/FolderIndex/empty-wallet.svg"
import { onToggleModal } from "../store/actions/app.actions"
import { loadFolderById } from "../store/actions/folder.actions"

import {
    Download, Trash2, Pencil
} from 'lucide-react'

export default function FolderIndex() {
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const files = useSelector((storeState) => storeState.fileModule.files)
    const filterBy = useSelector((storeState) => storeState.fileModule.filterBy)
    const currentFolder = useSelector((storeState) => storeState.folderModule.currentFolder)
    const isLoading = useSelector((storeState) => storeState.folderModule.isLoading)
    const params = useParams()
    const [onEditFile, setOnEditFile] = useState(true)

    useEffect(() => {
        loadFolderById(params.folderId)
        getFilesByFolderId(params.folderId)
    }, [params.folderId])

    useEffect(() => {
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

    async function loadFiles(folderId) {
        try {
            await getFilesByFolderId(folderId)
        }
        catch (err) {
            console.log('Had issues loading files\nError:', err);
        }
    }

    async function uploadFile(ev) {
        try {
            await uploadFileToCloud(ev)
        }
        catch (err) {
            console.log('Had issues loading files\nError:', err);
        }
    }

    async function downloadFile() {
        console.log('downloading file');
    }

    function getExtensionLabel(extension) {
        switch (extension) {
            case 'docx':
                return 'Word Document'
            case 'txt':
                return 'Text Document'
            case 'pptx':
                return 'PowerPoint Presentation'
            case 'pdf':
                return 'PDF Document'
            case 'xlsx':
                return 'Excel Spreadsheet'
            case 'url':
                return 'Web Link'
            default:
                return null
        }
    }
    // function getExtensionSVG(extension, cName) {
    //     switch (extension) {
    //         case 'docx':
    //             return <img className={cName} src={docxIcon} alt="docx file icon" />
    //         case 'txt':
    //             return <img className={cName} src={txtIcon} alt="txt file icon" />
    //         case 'pptx':
    //             return <img className={cName} src={txtIcon} alt="pptx file icon" />
    //         case 'pdf':
    //             return <img className={cName} src={pdfIcon} alt="pdf file icon" />
    //         case 'xlsx':
    //             return <img className={cName} src={xlsxIcon} alt="xlsx file icon" />
    //         case 'url':
    //             return <img className={cName} src={linkIcon} alt="link icon" />
    //         default:
    //             return null
    //     }
    // }
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

    return (
        <>
            <div className="title-container">
                <div>
                    <h1>{currentFolder.name}</h1>
                    <button className="edit-title"
                        // onClick={() => setIsEditTitleModalOpen(true)}
                        aria-label="Edit title">
                        <Pencil />
                    </button>
                </div>
                <button
                // onClick={() => setIsFolderModalOpen(true)}
                >
                    <p>+ Add file</p>
                </button>
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
                                <td>
                                    <div>
                                        <div>
                                            {doc.icon}
                                        </div>
                                        <p>{doc.name}</p>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <p>{doc.extension}</p>
                                        <p>{getExtensionLabel(doc.extension)}</p>
                                    </div>
                                </td>
                                <td>{doc.dateModified}</td>
                                <td>{doc.size}</td>
                                <td>
                                    <div>
                                        {onEditFile && (
                                            <button
                                                className=""
                                                title={`Edit ${doc.type === 'Folder' ? 'folder' : 'file'} name`}
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
                                            <Download size={16} />
                                        </button>
                                        <button title="Delete">
                                            <Trash2 size={16} />
                                        </button>
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
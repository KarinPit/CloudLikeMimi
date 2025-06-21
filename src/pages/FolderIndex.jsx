import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"

import UploadWidget from '../cmps/UploadWidget'
import { folderService } from "../services/folder.service"
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
import EmptyFolder from "../assets/imgs/FolderIndex/empty-wallet.svg"
import { onToggleModal } from "../store/actions/app.actions"
import { loadFolderById } from "../store/actions/folder.actions"

export default function FolderIndex() {
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const files = useSelector((storeState) => storeState.fileModule.files)
    const currentFolder = useSelector((storeState) => storeState.folderModule.currentFolder)
    const isLoading = useSelector((storeState) => storeState.folderModule.isLoading)
    const params = useParams()

    useEffect(() => {
        loadFolderById(params.folderId)
        loadFiles(params.folderId)
    }, [params.folderId])

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

    function getExtensionSVG(extension, cName) {
        switch (extension) {
            case 'docx':
                return <img className={cName} src={docxIcon} alt="docx file icon" />
            case 'txt':
                return <img className={cName} src={txtIcon} alt="txt file icon" />
            case 'pptx':
                return <img className={cName} src={txtIcon} alt="pptx file icon" />
            case 'pdf':
                return <img className={cName} src={pdfIcon} alt="pdf file icon" />
            case 'xlsx':
                return <img className={cName} src={xlsxIcon} alt="xlsx file icon" />
            default:
                return null
        }
    }
    // loading animation until data is collected
    if (isLoading || !currentFolder) return (
        <section className="folder-info">
            <LoadingAnim />
        </section>
    )
    return (
        <section className="folder-index">
            <div className="folder-title">
                <h1>{`${currentFolder.name}`}</h1>
                <button onClick={onEditFolder}>
                    <img src={editIcon}></img>
                </button>
                <div className='add-file'>
                    <UploadWidget folderId={currentFolder.id} />
                    {/* <button onClick={uploadFile}>+ Add file</button> */}
                </div>
            </div>
            {files.length > 0 ? currentWidth <= smallScreen ?
                // layout for small screens
                <div className="folder-info mobile">
                    {files.map((file, idx) => {
                        return (
                            <div key={idx} className="file-info">
                                <div className="img-container">
                                    {getExtensionSVG(file.extension, "file-img")}
                                    <button>
                                        <img className="vert-dots" src={vertDotsIcon}></img>
                                    </button>
                                </div>
                                <p>{file.name}</p>
                            </div>
                        )
                    })}

                </div>
                :
                // layout for normal and above screens
                <div className="folder-info">
                    {files.map((file, idx) => {
                        return (<div key={idx} className="file-info">
                            {getExtensionSVG(file.extension, "file-img")}
                            <table>
                                <thead>
                                    <tr>
                                        <th>File Name</th>
                                        <th>Date Modified</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{file.name}</td>
                                        <td>{file.dateModified}</td>
                                        <td>{file.size}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="file-actions">
                                <button onClick={() => downloadFile('abcd123')}>
                                    <img src={downloadIcon}></img>
                                </button>
                                <button onClick={() => deleteFile(file.id)}>
                                    <img src={trashIcon}></img>
                                </button>
                            </div>
                        </div>)
                    })}
                </div>
                : <div className="empty-folder">
                    <img src={EmptyFolder}></img>
                    <p>No files to show...</p>
                </div>
            }
        </section >
    )
}
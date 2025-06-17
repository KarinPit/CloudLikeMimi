import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"

import { folderService } from "../services/folder.service"
import { fileService } from "../services/file.service"

import LoadingAnim from "../cmps/LoadingAnim"
import downloadIcon from "../assets/imgs/FolderIndex/download.svg"
import trashIcon from "../assets/imgs/FolderIndex/trash.svg"
import vertDotsIcon from "../assets/imgs/FolderIndex/dots.svg"
import docxIcon from "../assets/imgs/FolderIndex/docx.svg"
import txtIcon from "../assets/imgs/FolderIndex/txt.svg"
import pdfIcon from "../assets/imgs/FolderIndex/pdf.svg"
import xlsxIcon from "../assets/imgs/FolderIndex/xlsx.svg"
import EmptyFolder from "../assets/imgs/FolderIndex/empty-wallet.svg"

export default function FolderIndex() {
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const normalScreen = useSelector((storeState) => storeState.appModule.normalScreen)
    const wideScreen = useSelector((storeState) => storeState.appModule.wideScreen)
    const [folder, setFolder] = useState(null)
    const [files, setFiles] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadFolder()
    }, [params.folderId])

    async function loadFolder() {
        try {
            const folder = await folderService.getById(params.folderId)
            const files = await fileService.getByFolderId(params.folderId)
            setFolder(folder)
            setFiles(files)
        }
        catch (err) {
            navigate("/")
            console.log('Had issues loading folder\nRedirecting to home page\nError:', err);
        }
    }

    async function downloadFile() {
        console.log('downloading file');
    }

    async function deleteFile() {
        console.log('deleting file');
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

    if (!folder) return (
        <section className="folder-info">
            <LoadingAnim />
        </section>
    )
    return (
        <section className="folder-index">
            <h1>{`${folder.name}`}</h1>
            {files.length > 0 ? currentWidth <= smallScreen ?
                <div className="folder-info mobile">
                    {files.map((file, idx) => {
                        return (
                            <div key={idx} className="file-info">
                                <div className="img-container">
                                    {/* {console.log(file.extension)} */}
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
                <div className="folder-info">
                    {files.map((file, idx) => {
                        return (<div className="file-info">
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
                                <button onClick={() => deleteFile('abcd123')}>
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
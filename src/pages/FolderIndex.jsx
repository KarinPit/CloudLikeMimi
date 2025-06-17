import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"

import { folderService } from "../services/folder.service"

import LoadingAnim from "../cmps/LoadingAnim"
import docxIcon from "../assets/imgs/FolderIndex/docx.svg"

export default function FolderIndex() {
    const currentWidth = useSelector((storeState) => storeState.appModule.screenWidth)
    const smallScreen = useSelector((storeState) => storeState.appModule.smallScreen)
    const normalScreen = useSelector((storeState) => storeState.appModule.normalScreen)
    const wideScreen = useSelector((storeState) => storeState.appModule.wideScreen)
    const [folder, setFolder] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadFolder()
    }, [params.folderId])

    async function loadFolder() {
        try {
            const folder = await folderService.getById(params.folderId)
            setFolder(folder)
        }
        catch (err) {
            navigate("/")
            console.log('Had issues loading folder\nRedirecting to home page\nError:', err);
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

            {currentWidth <= smallScreen ?
                <div className="folder-info mobile">
                    <div className="file-info">
                        {1 === 1 ? <img className="file-img" src={docxIcon}></img> : ''}
                        <p>karin</p>
                    </div>
                </div>
                :
                <div className="folder-info">
                    <table>
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>Date Modified</th>
                                <th>Size</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>karin</td>
                                <td>Oct 1, 2023</td>
                                <td>12MB</td>
                                <td>view, delete</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }


        </section >
    )
}
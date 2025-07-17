import { useState } from "react";
import { folderService } from "../services/folder.service";

import { saveFolder } from "../store/actions/folder.actions";
import { onToggleModal } from "../store/actions/app.actions";

import {
    User,
    XIcon,
    HomeIcon,
    FolderIcon,
    SettingsIcon,
    HelpCircleIcon,
    LogOutIcon,
} from 'lucide-react'

export default function AddFolderModal() {
    const [folder, setFolder] = useState(folderService.getDefaultFolder())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'range') value = +value
        setFolder(prevFolder => ({ ...prevFolder, [field]: value }))
    }

    async function onCreateFolder(ev) {
        ev.preventDefault()

        try {
            let folderName = folder.name
            if (!folderName || !/[a-zA-Z0-9]/.test(folderName)) {
                folderName = 'New folder'
                setFolder(prevFolder => ({ ...prevFolder, name: folderName }));
            }
            await saveFolder({ name: folderName })
            setFolder(folderService.getDefaultFolder());
            onToggleModal('addFolder', null)

        } catch (err) {
            console.log('Had issues creating new folder', err)
        }
    }

    return (
        <div className="add-folder-modal">
            <div className="modal-container">
                <div className="title-and-close-btn">
                    <h2>Create new folder</h2>
                    <button className="close-modal" onClick={() => onToggleModal('addFolder', null)}>
                        <XIcon />
                    </button>
                </div>
                <form onSubmit={onCreateFolder}>
                    <div className="input-container">
                        <label for="name">Folder Name</label>
                        <input className="input-name" type="text" id="name" name="name" placeholder="Enter folder name" onChange={handleChange} />
                    </div>
                    <div className="btn-container">
                        <button type="button" onClick={() => { onToggleModal('addFolder', null) }}>Cancel</button>
                        <button>Create folder</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
import { useState } from "react";
import { folderService } from "../services/folder.service";

import { saveFolder } from "../store/actions/folder.actions";
import { onToggleModal } from "../store/actions/app.actions";

import closeIcon from "../assets/imgs/AddFolderModal/close.svg"

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
            let folderColor = folder.color
            if (!folderName || !/[a-zA-Z0-9]/.test(folderName)) {
                folderName = 'New folder'
                setFolder(prevFolder => ({ ...prevFolder, name: folderName }));
            }
            await saveFolder({ name: folderName, color: folderColor })
            setFolder(folderService.getDefaultFolder());
            onToggleModal('addFolder', null)

        } catch (err) {
            console.log('Had issues creating new folder', err)
        }
    }

    return (
        <div className="add-folder-modal">
            <div className="modal-container">
                <h2>Create new folder</h2>
                <button className="close-modal" onClick={() => onToggleModal('addFolder', null)}>
                    <img src={closeIcon}></img>
                </button>
                <form onSubmit={onCreateFolder}>
                    <div className="input-container">
                        <input className="input-name" type="text" id="name" name="name" value={folder.name} onChange={handleChange} />
                        <input className="input-color" type="color" id="color" name="color" value={folder.color} onChange={handleChange} />
                    </div>
                    <button>Create folder</button>
                </form>
            </div>
        </div>
    )
}
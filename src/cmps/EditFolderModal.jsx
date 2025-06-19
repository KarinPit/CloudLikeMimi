import { useState } from "react";
import { folderService } from "../services/folder.service";

import { saveFolder } from "../store/actions/folder.actions";
import { onToggleModal } from "../store/actions/app.actions";

import closeIcon from "../assets/imgs/AddFolderModal/close.svg"
import { useSelector } from "react-redux";

export default function EditFolderModal() {
    const currentFolder = useSelector((storeState) => storeState.folderModule.currentFolder)
    const [folder, setFolder] = useState(currentFolder)

    function handleChange({ target }) {
        let { value, type, name: field } = target
        if (type === 'range') value = +value
        setFolder(prevFolder => ({ ...prevFolder, [field]: value }))
    }

    async function onEditFolder(ev) {
        ev.preventDefault()

        try {
            let folderName = folder.name
            let folderColor = folder.color
            if (!folderName || !/[a-zA-Z0-9]/.test(folderName)) {
                folderName = 'New folder'
                setFolder(prevFolder => ({ ...prevFolder, name: folderName }));
            }
            await saveFolder({ id: folder.id, name: folderName, color: folderColor })
            setFolder(folderService.getDefaultFolder());
            onToggleModal('editFolder', null)

        } catch (err) {
            console.log('Had issues editing folder', err)
        }
    }

    return (
        <div className="edit-folder-modal">
            <div className="modal-container">
                <h2>Edit folder</h2>
                <button className="close-modal" onClick={() => onToggleModal('editFolder', null)}>
                    <img src={closeIcon}></img>
                </button>
                <form onSubmit={onEditFolder}>
                    <div className="input-container">
                        <input className="input-name" type="text" id="name" name="name" value={folder.name} onChange={handleChange} />
                        <input className="input-color" type="color" id="color" name="color" value={folder.color} onChange={handleChange} />
                    </div>
                    <button>Save changes</button>
                </form>
            </div>
        </div>
    )
}
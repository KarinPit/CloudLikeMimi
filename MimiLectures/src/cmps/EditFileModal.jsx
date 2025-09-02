import { useSelector } from 'react-redux'
import { onToggleModal } from '../store/actions/app.actions'

import {
    Pencil, XIcon, UploadIcon
} from 'lucide-react'
import { useForm } from '../customHooks/useForm'
import { useState } from 'react'
import { saveFile } from '../store/actions/file.actions'

export default function EditFileModal() {
    const currentFile = useSelector((storeState) => storeState.fileModule.currentFile)
    const [currentFileToEdit, setCurrentFileToEdit] = useState(currentFile)

    async function onSaveTitle(ev) {
        ev.preventDefault()
        try {
            await saveFolder(currentFileToEdit)
            onToggleModal('editFoldetTitle', null)
        }
        catch (err) {
            console.log('Error in updating folder title: ', err);
        }
    }

    return (
        <div className='edit-file-modal'>
            <div className='modal-container'>
                <div className="title-container">
                    <h2>Edit file</h2>
                    <button onClick={() => onToggleModal('editFileModal', null)} aria-label="Close">
                        <XIcon />
                    </button>
                </div>
                <form>
                    <div className="input-container">
                        <label htmlFor="documentTitle">
                            Title
                        </label>
                        <input type="text"
                            id="documentTitle"
                            placeholder="Title"
                            value={currentFileToEdit?.name}
                            onChange={(ev) => {
                                onChangeTitle(ev)
                            }}
                            autoFocus
                        />
                    </div>
                    <div className="modal-type-img">
                        <div>
                            <span>Aa</span>
                            <div>
                                <Pencil />
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={() => onToggleModal('editFileModal', null)}>
                            Cancel
                        </button>
                        <button type="submit" onClick={(ev) => onSaveTitle(ev)}>
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

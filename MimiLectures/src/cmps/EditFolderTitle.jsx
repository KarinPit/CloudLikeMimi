import { useSelector } from 'react-redux'
import { onToggleModal } from '../store/actions/app.actions'

import {
    Pencil, XIcon
} from 'lucide-react'
import { useForm } from '../customHooks/useForm'
import { useState } from 'react'
import { saveFolder } from '../store/actions/folder.actions'

export default function EditFolderTitle() {
    const currentFolder = useSelector((storeState) => storeState.folderModule.currentFolder)
    const [currentFolderToEdit, setCurrentFolderToEdit] = useState(currentFolder)

    function onChangeTitle(ev) {
        console.log(currentFolder);
        
        setCurrentFolderToEdit((prev) => ({ ...prev, name: ev.target.value }))
    }

    async function onSaveTitle(ev) {
        ev.preventDefault()
        try {
            await saveFolder(currentFolderToEdit)
            setCurrentFolderToEdit(null)
            onToggleModal('editFoldetTitle', null)
        }
        catch (err) {
            console.log('Error in updating folder title: ', err);
        }
    }

    return (
        <div className='edit-folder-title'>
            <div className='modal-container'>
                <div className="title-container">
                    <h2>Edit title</h2>
                    <button onClick={() => onToggleModal('editFoldetTitle', null)} aria-label="Close">
                        <XIcon />
                    </button>
                </div>
                <form>
                    {/* <form onSubmit={handleSubmit} className="space-y-5"> */}
                    <div className="input-container">
                        <label
                            htmlFor="documentTitle"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="documentTitle"
                            placeholder="Title"
                            value={currentFolderToEdit?.name}
                            onChange={(ev) => {
                                onChangeTitle(ev)
                            }}
                            autoFocus
                        />
                        {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
                    </div>
                    <div className="modal-type-img">
                        <div>
                            <span className="text-3xl font-bold text-gray-700">Aa</span>
                            <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md">
                                <Pencil className="text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="button" onClick={() => onToggleModal('editFoldetTitle', null)}>
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

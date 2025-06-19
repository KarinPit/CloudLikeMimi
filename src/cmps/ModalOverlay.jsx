import { onToggleAddFolderModal } from "../store/actions/app.actions"

export default function ModalOverlay() {
    return (
        <div className="modal-overlay" onClick={() => onToggleAddFolderModal()}>
        </div>
    )
}
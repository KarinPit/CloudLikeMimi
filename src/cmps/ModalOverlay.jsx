import { onToggleModal } from "../store/actions/app.actions"

export default function ModalOverlay({ modalType }) {
    return (
        <div className="modal-overlay" onClick={() => onToggleModal(modalType, null)}>
        </div>
    )
}
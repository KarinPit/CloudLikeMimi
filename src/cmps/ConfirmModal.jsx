import { useNavigate } from "react-router";
import { onToggleModal } from "../store/actions/app.actions";
import { useRef } from "react";


export default function ConfirmModal({ message, toExec, folderId, toNavigate }) {
    const navigate = useNavigate()

    async function onConfirm(ev) {
        const clickedOption = ev.target.innerText

        if (clickedOption === 'Yes' && typeof toExec === 'function') {
            await toExec(folderId)
            if (toNavigate) {
                navigate(toNavigate)
            }
        }
        onToggleModal({ confirmModal: null }) // Close modal
    }

    return (
        <div className="confirm-modal">
            <div className="modal-container">
                <h2>Are you sure you want to {message}?</h2>
                <div className="confirm-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onConfirm}>No</button>
                </div>
            </div>
        </div>
    )
}
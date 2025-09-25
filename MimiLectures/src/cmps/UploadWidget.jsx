import { useEffect, useRef } from "react";
import { saveFile } from "../store/actions/file.actions";

export default function UploadWidget({ folderId }) {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const CLOUD_NAME = "dn2zm8wqn"
    const UPLOAD_PRESET = "mimiWebsite"


    function getExtension(info) {
        if (info.format) return info.format
        const path = info.path
        const parts = path.split('.')
        const extension = parts[parts.length - 1]
        return extension
    }

    async function saveCloudinaryFile(info) {
        const fileToSave = { name: info.original_filename, extension: getExtension(info), dateModified: info.created_at, size: info.bytes, folderId: folderId, publicId: info.public_id }
        try {
            await saveFile(folderId, fileToSave)
        } catch (err) {
            console.log('Error saving cloudinary res as file', err);
        }
    }

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: CLOUD_NAME,
            uploadPreset: UPLOAD_PRESET,
            folder: folderId,
        }, function (err, res) {

            if (err) {
                console.log('Had issues in UploadWidget component\nError:', err);
            }
            else if (res.event === "success") {
                console.log(res.info);
                saveCloudinaryFile(res.info)
            }
        })
    }, [])

    return (
        <button onClick={() => { widgetRef.current.open() }}>
            <p>+ Add file</p>
        </button>
    )
}
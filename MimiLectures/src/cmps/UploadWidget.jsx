import { useEffect, useRef } from "react";

export default function UploadWidget({ folderId }) {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    const CLOUD_NAME = "dn2zm8wqn"
    const UPLOAD_PRESET = "mimiWebsite"

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: CLOUD_NAME,
            uploadPreset: UPLOAD_PRESET,
            folder: folderId
        }, function (err, res) {

            if (err) {
                console.log('Had issues in UploadWidget component\nError:', err);
            }
            else if (res.event === "success") {
                console.log("File uploaded successfully:", res.info);
            }
        })
    }, [])

    return (
        <button onClick={() => { widgetRef.current.open() }}>+ Add file</button>
    )
}
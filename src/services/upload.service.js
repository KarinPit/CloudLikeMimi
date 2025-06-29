export const uploadService = {
    uploadImg, uploadFileToCloud
}

async function uploadImg(ev) {
    const CLOUD_NAME = "dn2zm8wqn"
    const UPLOAD_PRESET = "mimiWebsite"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${UPLOAD_PRESET}/`

    try {
        // const filesPrms = files.map(() => {
        //     return new Promise(res => {

        //         res(imgData)
        //     })
        // })
        const formData = new FormData()
        formData.append('upload_preset', UPLOAD_PRESET)
        formData.append('file', ev.target.files[0])
        console.log('ev.target.files[0]', ev.target.files[0])

        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const imgData = await res.json()
        console.log('imgData', imgData)
        // return Promise.all(filesPrms)
        return imgData
    } catch (err) {
        console.error('Failed to upload', err)
        throw err
    }
}

async function uploadFileToCloud(ev) {

}
import { fileService } from "../../services/file.service.js";
import { uploadService } from "../../services/upload.service.js";

import { REMOVE_FILE, SET_FILES, SET_IS_LOADING } from "../reducers/file.reducer.js"

import { store } from "../store.js"

export async function getFilesByFolderId(folderId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const files = await fileService.getByFolderId(folderId)
        store.dispatch({ type: SET_FILES, files })
    } catch (err) {
        console.log('FileActions: err in loadFile', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

// export async function saveFile(file) {
//     try {
//         const type = file.id ? UPDATE_FOLDER : ADD_FOLDER
//         const savedFile = await fileService.save(file)
//         store.dispatch({ type, file: savedFile })
//     } catch (err) {
//         console.log('Had issues saving file', err)
//         throw err
//     }
// }

export async function deleteFile(fileId) {
    try {
        await fileService.remove(fileId)
        store.dispatch({ type: REMOVE_FILE, fileId: fileId })
    } catch (err) {
        console.log('Had issues removing file', err)
    }
}

export async function uploadFileToCloud(ev) {
    try {
        uploadService.uploadFileToCloud(ev)
    }
    catch (err) {
        console.log('Had issues uploading file', err)
        throw err
    }
}
import { folderService } from "../../services/folder.service.js";

import { ADD_FAVORITE, ADD_FOLDER, REMOVE_FAVORITE, SET_FOLDERS, SET_CURRENT_FOLDER, SET_IS_LOADING, UPDATE_FOLDER } from "../reducers/folder.reducer.js"

import { store } from "../store.js"

export async function loadFoldersData() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const folderData = await folderService.getFolderData()
        store.dispatch({ type: SET_FOLDERS, folderData })
    } catch (err) {
        console.log('FolderActions: err in loadFolderData', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadFolderById(folderId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const folder = await folderService.getById(folderId)
        store.dispatch({ type: SET_CURRENT_FOLDER, folder })
    } catch (err) {
        console.log('FolderActions: err in loadFolderData', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

// export async function setCurrentFolder(folder) {

//     try {
//         store.dispatch({ type: SET_CURRENT_FOLDER, folder })
//     } catch (err) {
//         console.log('FolderActions: err in loadFolderData', err)
//     }
// }

export async function saveFolder(folder) {
    try {
        const type = folder.id ? UPDATE_FOLDER : ADD_FOLDER
        const savedFolder = await folderService.save(folder)
        store.dispatch({ type, folder: savedFolder })
        store.dispatch({ type: SET_CURRENT_FOLDER, folder })
    } catch (err) {
        console.log('Had issues saving robots', err)
        throw err
    }
}
import { folderService } from "../../services/folder.service.js";

import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FOLDERS, SET_IS_LOADING } from "../reducers/folder.reducer.js"

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


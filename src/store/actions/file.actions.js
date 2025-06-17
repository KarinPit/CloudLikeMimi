import { fileService } from "../../services/file.service.js";

import { ADD_FAVORITE, ADD_FOLDER, REMOVE_FAVORITE, SET_FILES, SET_IS_LOADING, UPDATE_FOLDER } from "../reducers/file.reducer.js"

import { store } from "../store.js"

export async function loadFiles() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const files = await fileService.getFiles()
        store.dispatch({ type: SET_FILES, files })
    } catch (err) {
        console.log('FileActions: err in loadFile', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function saveFile(file) {
    try {
        const type = file.id ? UPDATE_FOLDER : ADD_FOLDER
        const savedFile = await fileService.save(file)
        store.dispatch({ type, file: savedFile })
    } catch (err) {
        console.log('Had issues saving robots', err)
        throw err
    }
}
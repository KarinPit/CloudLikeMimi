import { folderService } from "../../services/folder.service"

export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const SET_FOLDERS = 'SET_FOLDERS'
export const SET_CURRENT_FOLDER = 'SET_CURRENT_FOLDER'
export const ADD_FOLDER = 'ADD_FOLDER'
export const UPDATE_FOLDER = 'UPDATE_FOLDER'
export const REMOVE_FOLDER = 'REMOVE_FOLDER'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    favorites: [],
    folderData: [],
    currentFolder: null,
    filterBy: folderService.getDefaultFilter(),
    isLoading: true
}


export function folderReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case ADD_FAVORITE:
            return { ...state, favorites: cmd.favorites }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(folder => folder.name !== cmd.name)
                // favorites: state.favorites.filter(folder => folder.id !== cmd.userId)
            }
        case SET_FOLDERS:
            return { ...state, folderData: cmd.folderData }
        case SET_CURRENT_FOLDER:
            return { ...state, currentFolder: cmd.folder }
        case ADD_FOLDER:
            return {
                ...state,
                folderData: [...state.folderData, cmd.folder]
            }
        case UPDATE_FOLDER:
            return {
                ...state,
                folderData: state.folderData.map(folder => folder.id === cmd.folder.id ? cmd.folder : folder)
            }
        case REMOVE_FOLDER:
            return {
                ...state,
                folderData: state.folderData.filter(folder => folder.id !== cmd.folderId)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate }
            }
        default:
            return state
    }
}
import { fileService } from "../../services/file.service"

export const SET_FILES = 'SET_FILES'
export const ADD_FILE = 'ADD_FILE'
export const REMOVE_FILE = 'REMOVE_FILE'
export const UPDATE_FILE = 'UPDATE_FILE'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY_FILE = 'SET_FILTER_BY_FILE'

const initialState = {
    files: [],
    filterBy: fileService.getDefaultFilter(),
    isLoading: true
}


export function fileReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_FILES:
            return { ...state, files: cmd.files }
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, cmd.file]
            }
        case REMOVE_FILE:
            return {
                ...state,
                files: state.files.filter(file => file.id !== cmd.fileId)
            }
        case UPDATE_FILE:
            return {
                ...state,
                files: state.files.map(file => file.id === cmd.file.id ? cmd.file : file)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_FILTER_BY_FILE:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate }
            }
        default:
            return state
    }
}
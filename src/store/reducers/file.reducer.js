export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
export const SET_FILES = 'SET_FILES'
export const ADD_FILE = 'ADD_FILE'
export const UPDATE_FILE = 'UPDATE_FILE'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    favorites: [],
    files: [],
    isLoading: true
}


export function fileReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case ADD_FAVORITE:
            return { ...state, favorites: cmd.favorites }
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter(file => file.name !== cmd.name)
                // favorites: state.favorites.filter(file => file.id !== cmd.userId)
            }
        case SET_FILES:
            return { ...state, files: cmd.files }
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, cmd.file]
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
        default:
            return state
    }
}
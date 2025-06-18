import { SET_IS_OPEN_ADD_FOLDER_MODAL, SET_SCREEN_WIDTH } from "../reducers/app.reducer";
import { store } from "../store";


export function onToggleAddFolderModal(isOpen = null) {
    store.dispatch({
        type: SET_IS_OPEN_ADD_FOLDER_MODAL,
        isOpen
    })
}

export function setScreenWidth(currentWidth) {
    // const newIsWideScreen = window.innerWidth !== store.getState().appModule.screenWidth
    // store.dispatch({ type: SET_CURRENT_WIDTH, currentWidth: window.innerWidth })

    store.dispatch({
        type: SET_SCREEN_WIDTH,
        screenWidth: currentWidth
    })
}
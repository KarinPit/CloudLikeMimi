import { SET_TOGGLE_MODAL, SET_SCREEN_WIDTH } from "../reducers/app.reducer";
import { store } from "../store";


export function onToggleModal(modalType, isOpen = null) {
    store.dispatch({
        type: SET_TOGGLE_MODAL,
        modalType,
        isOpen
    })
}

export function setScreenWidth(currentWidth) {
    store.dispatch({
        type: SET_SCREEN_WIDTH,
        screenWidth: currentWidth
    })
}
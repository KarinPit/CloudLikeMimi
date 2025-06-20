import { SET_TOGGLE_MODAL, SET_SCREEN_WIDTH } from "../reducers/app.reducer";
import { store } from "../store";


export function onToggleModal(modalTypeOrState, isOpen = null) {
    const modalState = typeof modalTypeOrState === 'object'
        ? modalTypeOrState
        : { [modalTypeOrState]: isOpen }

    store.dispatch({
        type: SET_TOGGLE_MODAL,
        modalState
    })
    // store.dispatch({
    //     type: SET_TOGGLE_MODAL,
    //     modalState
    // })
}

export function setScreenWidth(currentWidth) {
    store.dispatch({
        type: SET_SCREEN_WIDTH,
        screenWidth: currentWidth
    })
}
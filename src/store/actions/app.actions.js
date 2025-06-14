import { SET_MODAL_DATA, SET_SCREEN_WIDTH } from "../reducers/app.reducer";
import { store } from "../store";


export function onToggleModal(modalData = null) {
    store.dispatch({
        type: SET_MODAL_DATA,
        modalData
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
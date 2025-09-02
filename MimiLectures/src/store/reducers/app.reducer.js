export const SET_TOGGLE_MODAL = 'SET_IS_OPEN_ADD_FOLDER_MODAL'
export const SET_SCREEN_WIDTH = 'SET_SCREEN_WIDTH'


const initialState = {
	modals: { addFolder: null, editFolder: null, confirmModal: null, forgotPassword: null, mainMenu: null, editFoldetTitle: null, editFileModal: null},
	screenWidth: window.innerWidth,
	smallScreen: 550,
	normalScreen: 950,
	wideScreen: 1128,
}

export function appReducer(state = initialState, cmd = {}) {
	switch (cmd.type) {
		case SET_TOGGLE_MODAL:
			return {
				...state,
				modals: { ...state.modals, ...cmd.modalState }
			}
		case SET_SCREEN_WIDTH:
			return {
				...state,
				screenWidth: cmd.screenWidth
			}

		default:
			return state
	}
}
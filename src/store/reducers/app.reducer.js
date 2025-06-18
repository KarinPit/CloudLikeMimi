export const SET_IS_OPEN_ADD_FOLDER_MODAL = 'SET_IS_OPEN_ADD_FOLDER_MODAL'
export const SET_SCREEN_WIDTH = 'SET_SCREEN_WIDTH'


const initialState = {
	isOpenAddFolderModal: false,
	screenWidth: window.innerWidth,
	smallScreen: 550,
	normalScreen: 950,
	wideScreen: 1128,
}

export function appReducer(state = initialState, cmd = {}) {
	switch (cmd.type) {
		case SET_IS_OPEN_ADD_FOLDER_MODAL:
			return {
				...state,
				isOpenAddFolderModal: cmd.isOpen
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
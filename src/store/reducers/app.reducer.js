export const SET_MODAL_DATA = 'SET_MODAL_DATA'
export const SET_SCREEN_WIDTH = 'SET_SCREEN_WIDTH'


const initialState = {
	modalData: null,
	screenWidth: window.innerWidth,
	smallScreen: 550,
	normalScreen: 950,
	wideScreen: 1128,
}

export function appReducer(state = initialState, cmd = {}) {
	switch (cmd.type) {
		case SET_MODAL_DATA:
			return {
				...state,
				modalData: cmd.modalData
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
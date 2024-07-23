import { ACTION_TYPE } from '../actions'

const initialBlogState = {
	isLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
}

export const appReducer = (state = initialBlogState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				isLogout: !state.isLogout,
			}
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			}
		case ACTION_TYPE.CLOSE_MODAL:
			return initialBlogState

		default:
			return state
	}
}

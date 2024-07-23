import { ACTION_TYPE } from './action_type'

export const setUser = (user) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
})

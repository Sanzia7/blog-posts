import { useEffect } from 'react'
import { useStore } from 'react-redux'

export const useResetForm = (reset) => {
	const store = useStore()

	useEffect(() => {
		let currentIsLogout = store.getState().app.isLogout

		return store.subscribe(() => {
			let previousIsLogout = currentIsLogout
			currentIsLogout = store.getState().app.isLogout

			if (currentIsLogout !== previousIsLogout) {
				reset()
			}
		})
	}, [reset, store])
}

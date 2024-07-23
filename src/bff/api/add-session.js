export const addSession = async (hash, user) =>
	fetch('http://localhost:3007/sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			user,
		}),
	})

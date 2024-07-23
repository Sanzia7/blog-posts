export const deleteUser = (userId) =>
	fetch(`http://localhost:3007/users/${userId}`, {
		method: 'DELETE',
	})

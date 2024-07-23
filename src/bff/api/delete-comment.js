export const deleteComment = (commentId) =>
	fetch(`http://localhost:3007/comments/${commentId}`, {
		method: 'DELETE',
	})

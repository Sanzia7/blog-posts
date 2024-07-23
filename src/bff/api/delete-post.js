export const deletePost = (postId) =>
	fetch(`http://localhost:3007/posts/${postId}`, {
		method: 'DELETE',
	})

import { ROLE } from '../../constants'
import { deletePost, deleteComment, getComments, getPost } from '../api'
import { sessions } from '../sessions'

export const removePost = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN]
	const access = await sessions.access(hash, accessRoles)
	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		}
	}

	await deletePost(postId)

	const post = await getPost(postId)
	const comments = await getComments(postId)
	await deleteComment(id)

	return {
		error: null,
		response: {
			...post,
			comments,
		},
	}
}

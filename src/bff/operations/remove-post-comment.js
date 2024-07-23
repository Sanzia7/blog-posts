import { deleteComment, getPost } from '../api'
import { sessions } from '../sessions'
import { getAuthorPostComments } from '../utils'
import { ROLE } from '../../constants'

export const removePostComment = async (hash, postId, id) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR]

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		}
	}

	await deleteComment(id)

	const post = await getPost(postId)

	const authorPostComments = await getAuthorPostComments(postId)

	return {
		error: null,
		response: {
			...post,
			comments: authorPostComments,
		},
	}
}

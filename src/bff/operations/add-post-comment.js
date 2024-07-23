import { ROLE } from '../../constants'
import { addComment, getPost } from '../api'
import { sessions } from '../sessions'
import { getAuthorPostComments } from '../utils'

export const addPostComment = async (hash, userId, postId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER]
	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		}
	}

	await addComment(userId, postId, content)

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

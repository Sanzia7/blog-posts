import { ROLE } from '../../constants'
import { addPost, updatePost } from '../api'
import { sessions } from '../sessions'

export const savePost = async (hash, newPostData) => {
	const accessRoles = [ROLE.ADMIN]
	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		}
	}

	const savedPost =
		newPostData.id === '' ? await addPost(newPostData) : await updatePost(newPostData)

	return {
		error: null,
		response: savedPost,
	}
}

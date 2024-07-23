import { ROLE } from '../../constants'
import { deleteUser } from '../api'
import { sessions } from '../sessions'

export const removeUser = async (hash, userId) => {
	const accessRoles = [ROLE.ADMIN]
	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		}
	}

	await deleteUser(userId)

	return {
		error: null,
		response: true,
	}
}

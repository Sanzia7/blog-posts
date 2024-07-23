import { ROLE } from '../../constants'
import { setUserRole } from '../api'
import { sessions } from '../sessions'

export const updateUserRole = async (hash, userId, newRoleId) => {
	const accessRoles = [ROLE.ADMIN]
	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			response: null,
		}
	}

	await setUserRole(userId, newRoleId)

	return {
		error: null,
		response: true,
	}
}

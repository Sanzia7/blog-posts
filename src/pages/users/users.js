import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useServerRequest } from '../../hooks'
import { selectUserRole } from '../../selectors'
import { checkAccess } from '../../utils'
import { ROLE } from '../../constants'
import { TableRow, UserRow } from './user-components'
import { H2, PrivateContent } from '../../components'
import styled from 'styled-components'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)
	const [isUpdateUserList, setIsUpdateUserList] = useState(false)
	const userRole = useSelector(selectUserRole)
	const requestServer = useServerRequest()

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}
				setUsers(usersRes.response)
				setRoles(rolesRes.response)
			},
		)
	}, [requestServer, isUpdateUserList, userRole])

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		requestServer('removeUser', userId).then(() => {
			setIsUpdateUserList(!isUpdateUserList)
		})
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи: </H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registered-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => +roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	)
}

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px auto;
	width: 570px;
`

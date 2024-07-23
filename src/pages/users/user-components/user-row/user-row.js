import PropTypes from 'prop-types'
import { useState } from 'react'
import { useServerRequest } from '../../../../hooks'
import { TableRow } from '../table-row/table-row'
import { Icon } from '../../../../components'
import { PROP_TYPE } from '../../../../constants'
import styled from 'styled-components'

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId)
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)
	const requestServer = useServerRequest()

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value))
	}

	const onRoleSave = (userId, newRoleId) => {
		requestServer('updateUserRole', userId, newRoleId).then(() => {
			setInitialRoleId(newRoleId)
		})
	}

	const isSaveBtnDisabled = selectedRoleId === initialRoleId

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<div className="save-role-button">
						<Icon
							id="fa-floppy-o"
							margin="0 0 0 10px"
							disabled={isSaveBtnDisabled}
							onClick={() => onRoleSave(id, selectedRoleId)}
						/>
					</div>
				</div>
			</TableRow>
			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				size="24px"
				onClick={onUserRemove}
			/>
		</div>
	)
}

export const UserRow = styled(UserRowContainer)`
	display: flex;
	align-items: center;

	& select {
		font-size: 17px;
		padding: 0 5px;
	}
`

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
}

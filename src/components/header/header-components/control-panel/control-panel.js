import { Link, useNavigate } from 'react-router-dom'
import { Button, Icon } from '../../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLogin, selectUserRole, selectUserSession } from '../../../../selectors'
import { ROLE } from '../../../../constants'
import { logout } from '../../../../actions'
import { checkAccess } from '../../../../utils'
import styled from 'styled-components'

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`
const UserName = styled.div`
	align-items: center;
	font-size: 22px;
	font-weight: bold;
	margin: 5px;
	color: #077077;
`

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)
	const login = useSelector(selectUserLogin)
	const session = useSelector(selectUserSession)

	const onLogout = () => {
		dispatch(logout(session))
		sessionStorage.removeItem('userData')
	}

	const isAdmin = checkAccess([ROLE.ADMIN], roleId)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa-sign-out"
							margin="0 0 0 10px"
							size="29px"
							onClick={onLogout}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px auto" onClick={() => navigate(-1)} />
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px" />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	)
}

export const ControlPanel = styled(ControlPanelContainer)``

//<i class="fa fa-sign-out" aria-hidden="true"></i>

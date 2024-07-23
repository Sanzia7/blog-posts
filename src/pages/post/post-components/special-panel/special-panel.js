import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions'
import { useServerRequest } from '../../../../hooks'
import { Icon } from '../../../../components'
import { checkAccess } from '../../../../utils'
import { ROLE } from '../../../../constants'
import { selectUserRole } from '../../../../selectors'
import styled from 'styled-components'

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()
	const navigate = useNavigate()
	const userRole = useSelector(selectUserRole)

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => {
						navigate('/')
					})
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<div className={className}>
			<div className="published_at">
				{publishedAt && (
					<Icon
						inactive={true}
						id="fa-calendar-o"
						margin="0 10px 0 0"
						size="20px"
					/>
				)}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="24px"
							margin="0 0 0 10px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 18px;
	margin: ${({ margin }) => margin};

	& .published_at {
		display: flex;
		font-size: 18px;
		align-items: center;
	}

	& .buttons {
		display: flex;
		align-items: center;
		// gap: 5px;
	}
`

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
}

// & i {
// 	position: relative;
// 	top: -3px;
// 	font-size: 18px;
// }

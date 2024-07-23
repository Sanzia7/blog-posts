import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions'
import { useServerRequest } from '../../../../../../hooks'
import { selectUserRole } from '../../../../../../selectors'
import { Icon } from '../../../../../../components'
import { ROLE } from '../../../../../../constants'
import styled from 'styled-components'

const CommentContainer = ({ className, postId, id, author, publishedAt, content }) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()
	const userRole = useSelector(selectUserRole)

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить коментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole)

	return (
		<div className={className}>
			<div className="comment">
				<div className="info-panel">
					<div className="author">
						<Icon
							inactive={true}
							id="fa-user-circle-o"
							size="18px"
							margin="0 7px 3px 10px"
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							size="18px"
							margin="0 7px 0 10px"
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					size="20px"
					margin="10px 0 0 10px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	)
}

export const Comment = styled(CommentContainer)`
	display: flex;
	width: 100%;
	margin-top: 10px;

	& .comment {
		width: 550px;
		padding: 7px;
		border: 1px solid darkblue;
		//justify-content: space-between;
		font-style: italic;
	}

	& .info-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
}

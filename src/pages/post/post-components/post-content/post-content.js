import { useNavigate } from 'react-router-dom'
import { H2, Icon } from '../../../../components'
import { SpecialPanel } from '../special-panel/special-panel'
import { PROP_TYPE } from '../../../../constants'
import styled from 'styled-components'

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate()
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						margin="3px 2px 0 10px"
						size="24px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	)
}

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 5px 0;
	}

	& .post-text {
		font-size: 17px;
		white-space: pre-line;
	}
`

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}

// & i {
// 	position: relative;
// 	top: -3px;
// 	font-size: 18px;
// }
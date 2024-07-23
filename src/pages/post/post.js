import { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router-dom'
import { RESET_POST_DATA, loadPostAsync } from '../../actions'
import { useServerRequest } from '../../hooks'
import { selectPost } from '../../selectors'
import { ROLE } from '../../constants'
import { Error, PrivateContent } from '../../components'
import { Comments, PostContent, PostForm } from './post-components'
import styled from 'styled-components'

const PostContainer = ({ className }) => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const post = useSelector(selectPost)
	const dispatch = useDispatch()
	const params = useParams()
	const isCreating = !!useMatch('/post')
	const isEditing = !!useMatch('/post/:id/edit')
	const requestServer = useServerRequest()

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA)
	}, [dispatch, isCreating])

	useEffect(() => {
		if (isCreating) {
			setIsLoading(false)
			return
		}
		dispatch(loadPostAsync(requestServer, params.id)).then((postData) => {
			setError(postData.error)
			setIsLoading(false)
		})
	}, [dispatch, requestServer, params.id, isCreating])

	if (isLoading) {
		return null
	}

	const successfulPost =
		isCreating || isEditing ? (
			<PrivateContent access={[ROLE.ADMIN]}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivateContent>
		) : (
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		)

	return error ? <Error error={error} /> : successfulPost
}

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`
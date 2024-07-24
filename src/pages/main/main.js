import { useEffect, useMemo, useState } from 'react'
//import { useCallback } from 'react'
import { useServerRequest } from '../../hooks'
import { Pagination, PostCard, Search } from './main-components'
import { PAGINATION_LIMIT } from '../../constants'
import { debounce } from './utils'
//import { getLastPageLinks } from './utils'
import styled from 'styled-components'

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [searchPhrase, setSearchPhrase] = useState('')
	const [isSearch, setIsSearch] = useState(false)
	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ response: { posts } }) => {
				setPosts(posts)
				//setLastPage(getLastPageLinks(links))
				setLastPage(1)
				console.log('post', posts)
			},
		)
	}, [requestServer, page, isSearch])

	const startDelayedSearch = useMemo(() => debounce(setIsSearch, 2000), [])
	//const startDelayedSearch = useCallback(() => debounce(setIsSearch, 2000), [])

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value)
		startDelayedSearch(!isSearch)
	}

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{posts.length > 0 ? (
				<div className="post-list">
					{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							publishedAt={publishedAt}
							commentsCount={commentsCount}
						/>
					))}
				</div>
			) : (
				<div className="no-post-found">Статьи не найдены</div>
			)}

			{lastPage === 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	)
}

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}

	& .no-post-found {
		text-align: center;
		margin-top: 40px;
		font-size: 18px;
		color: green;
	}
`

// requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
// 			({ response: { posts, links } }) => {
// 				setPosts(posts)
// 				// setLastPage(getLastPageLinks(links))
// 			},

import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './actions'
import { Route, Routes } from 'react-router-dom'
import { Error, Footer, Header, Modal } from './components'
import { Authorization, Main, Post, Registration, Users } from './pages'
import { ERROR } from './constants'
import styled from 'styled-components'

const BlogColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100vh;
	min-height: 100%;
	margin: 0 auto;
	background-color: #f9f9e1;
`

const Page = styled.div`
	padding: 120px 0 20px;
`

export const Blog = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')

		if (!currentUserDataJSON) {
			return
		}

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		)
	}, [dispatch])

	return (
		<BlogColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</BlogColumn>
	)
}


// npm install json-server@0.17.4
// npx json-server --watch src/db.json --port 3007

// картинку ищем на сайте: https://picsum.photos/280/150

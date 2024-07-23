import { transformPost } from '../transformers'

export const getPosts = (searchPhrase, page, limit) =>
	fetch(
		`http://localhost:3007/posts?_title_like=${searchPhrase}&_page=${page}&_limit=${limit}`,
	)
		.then((loadedPosts) => loadedPosts.json())
		.then((loadedPosts) => ({
			posts: loadedPosts && loadedPosts.map(transformPost),
		}))

// export const getPosts = (searchPhrase, page, limit) =>
// 	fetch(`http://localhost:3005/posts?_title_like=${searchPhrase}&_page=${page}&_limit=${limit}`)
// 		.then((loadedPosts) =>
// 			Promise.all([loadedPosts.json(), loadedPosts.headers.get(`Link`)]),
// 		)
// 		.then(([loadedPosts, links]) => ({
// 			posts: loadedPosts && loadedPosts.map(transformPost),
// 			links,
//           console.log('Links:', links)
// 		}))

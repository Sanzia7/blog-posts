import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../../../../components'

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button onClick={() => setPage(page + 1)}>Следующая</Button>
			<Button onClick={() => setPage(lastPage)}>В конец</Button>
		</div>
	)
}

// const PaginationContainer = ({ className, page, lastPage, setPage }) => {
// 	return (
// 		<div className={className}>
// 			<Button disabled={page === 1} onClick={() => setPage(1)}>
// 				В начало
// 			</Button>
// 			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
// 				Предыдущая
// 			</Button>
// 			<div className="current-page">Страница: {page}</div>
// 			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
// 				Следующая
// 			</Button>
// 			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
// 				В конец
// 			</Button>
// 		</div>
// 	)
// }

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 10px 0;
	margin: 0 0 20px;
	padding: 0 20px;
	gap: 10px;

	& button {
		margin: 0 20px;
		line-height: 26px;
	}

	& .current-page {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 34px;
		margin: 0 20px;
		background-color: #f2df88;

		border: none;
		border: 1px solid #ebc416;
		border-radius: 5px;

		box-shadow:
			rgba(0, 0, 0, 0.25) 0px 14px 28px,
			rgba(0, 0, 0, -0.22) 0px 10px 10px;

		font-size: 16px;
		font-weight: 600;
		line-height: 26px;
		color: #099ded;

		// &:hover{
		// background-color: #07ff8f;
		// color: darkmagenta;
		// color: #ed760e;
	}
`

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
}

import { H2 } from '../h2/h2'
import { PROP_TYPE } from '../../constants'
import styled from 'styled-components'

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #e6370b;
	font-size: 24px;
	font-style: italic;
	font-weight: bold;
`

export const Error = ({ error }) =>
	error && (
		<Div>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</Div>
	)

Error.propTypes = {
	error: PROP_TYPE.ERROR,
}

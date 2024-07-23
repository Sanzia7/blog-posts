import ProptTypes from 'prop-types'
import { Icon, Input } from '../../../../components'
import styled from 'styled-components'

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск статей по заголовкам ..."
				onChange={onChange}
			/>
			<Icon
				inactive={true}
				id="fa-search"
				// margin="8px 10px 0 -28px"
				size="22px"
			/>
		</div>
	)
}

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	margin: 40px auto 0;
	width: 340px;
	height: 40px;

	& > input {
		padding: 10px 34px 10px 10px;
	}

	& > div {
		position: absolute;
		top: 8px;
		right: 8px;
	}
`
Search.propTypes = {
	searchPhrase: ProptTypes.string.isRequired,
	onChange: ProptTypes.func.isRequired,
}

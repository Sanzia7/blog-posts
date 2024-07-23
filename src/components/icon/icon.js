import PropTypes from 'prop-types'
import styled from 'styled-components'

const IconContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
)

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '22px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ disabled }) => (disabled ? 'lightblue' : 'darkblue')};

	&:hover {
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
		color: darkmagenta;
	}
`

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	inactive: PropTypes.bool,
}

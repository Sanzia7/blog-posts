import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	)
}

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	padding: 5px 12px;
	border: 1px solid darkblue;
	border: none;
	border-radius: 5px;
	box-shadow: #374d4a 1px 2px 4px;
	background-color: #fdffb8;
	color: darkblue;

	//cursor: pointer;


		&:hover{
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
		background: ${({ disabled }) => (disabled ? 'lemonchiffon' : 'steelblue')};
		color: white;
`

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
}

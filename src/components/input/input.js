import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import styled from 'styled-components'

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />
})

export const Input = styled(InputContainer)`
	width: ${({ width = ' 100%' }) => width};
	height: 40px;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border: 1px solid darkblue;
	border-radius: 5px;
	color: #035770;
	font-size: 20px;
	font-weight: bold;
`

Input.propTypes = {
	width: PropTypes.string,
}

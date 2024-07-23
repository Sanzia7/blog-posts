import { Link } from 'react-router-dom'
import { Icon } from '../../../../components'
import styled from 'styled-components'

const LargeName = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 17px;
`

const SmallName = styled.div`
	font-size: 18px;
	font-weight: bold;
`

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="70px" margin="0 10px 0 0" />
		<div>
			<LargeName>Блог</LargeName>
			<SmallName>веб-разработчика</SmallName>
		</div>
	</Link>
)

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -18px;
`

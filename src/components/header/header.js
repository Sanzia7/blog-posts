import { ControlPanel, Logo } from './header-components'
import styled from 'styled-components'

const Description = styled.div`
	font-style: italic;
	padding: 8px;
`

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		</Description>
		<ControlPanel />
	</header>
)

export const Header = styled(HeaderContainer)`
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	background-color: #dcecfa;
	box-shadow: 0px -3px 17px #000;
	z-index: 10;
`

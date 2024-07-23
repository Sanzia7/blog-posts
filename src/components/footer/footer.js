import { useEffect, useState } from 'react'
import styled from 'styled-components'

const FooterContainer = ({ className }) => {
	const [city, setSity] = useState('')
	const [temperature, setTemperature] = useState('')
	const [weather, setWeather] = useState('')

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&lang=ru&appid=15d4c16370a1c7083acd75ca77ce0c61',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setSity(name)
				setTemperature(Math.round(main.temp))
				setWeather(weather[0].description)
			})
	}, [])

	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@deweloper.ru</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} градусов, {weather}
				</div>
			</div>
		</div>
	)
}

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120px;
	width: 1000px;
	padding: 20px 40px;
	font-size: 18px;
	font-weight: bold;
	line-height: 28px;
	background-color: #dcecfa;
	box-shadow: 0px 3px 17px #000;
`

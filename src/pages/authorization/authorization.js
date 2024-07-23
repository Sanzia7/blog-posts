import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../bff'
import { useResetForm } from '../../hooks'
import { selectUserRole } from '../../selectors'
import { setUser } from '../../actions'
import { ROLE } from '../../constants'
import { AuthFormError, Button, H2, Input } from '../../components'
import styled from 'styled-components'

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Введите свой Логин')
		.matches(/^\w+$/, 'Неверный Логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный Логин. Минимум 3 символа')
		.max(12, 'Неверный Логин. Максимум 12 символов'),
	password: yup
		.string()
		.required('Введите свой Пароль')
		.matches(/^[\w#%]+$/, 'Неверный Пароль. Допускаются буквы, цифры, знак # и %')
		.min(7, 'Неверный Пароль. Минимум 7 символов')
		.max(25, 'Неверный Пароль. Максимум 25 символов'),
})

const StyledLink = styled(Link)`
		text-align: center;
		text-decoration: underline;
		margin: 20px 0;
		font-size: 18px;

			&:hover{
			color: darkmagenta;
			cursor: pointer;
			text-decoration: none;
	`

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		//это запрос на наш собственный эмулятор сервера:
		server.authorize(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}
			dispatch(setUser(response))
			sessionStorage.setItem('userData', JSON.stringify(response))
		})
	}

	const formError = errors?.login?.message || errors?.password?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					color="#792159"
					type="text"
					placeholder="Логин... "
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="current-password"
					placeholder="Пароль... "
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>

				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	)
}

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`

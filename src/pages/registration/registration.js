import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../bff'
import { AuthFormError, Button, H2, Input } from '../../components'
import { useResetForm } from '../../hooks'
import { selectUserRole } from '../../selectors'
import { setUser } from '../../actions'
import { ROLE } from '../../constants'
import styled from 'styled-components'

const regFormSchema = yup.object().shape({
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
	passcheck: yup
		.string()
		.required('Введите повтороно свой Пароль')
		.oneOf([yup.ref('password'), null], 'Повтор Пароля не совпадает'),
})

const RegistrationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(regFormSchema),
	})

	const [serverError, setServerError] = useState(null)
	const dispatch = useDispatch()
	const roleId = useSelector(selectUserRole)

	useResetForm(reset)

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, response }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`)
				return
			}
			dispatch(setUser(response))
			sessionStorage.setItem('userData', JSON.stringify(response))
		})
	}

	const formError =
		errors?.login?.message || errors?.password?.message || errors?.passcheck?.message
	const errorMessage = formError || serverError

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
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
					type="new-password"
					placeholder="Пароль... "
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="new-password"
					placeholder="Повторный ввод пароля... "
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегестрироваться
				</Button>

				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	)
}

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`

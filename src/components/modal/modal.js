import { useSelector } from 'react-redux'
import { Button } from '../button/button'
import styled from 'styled-components'
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors'

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen)
	const text = useSelector(selectModalText)
	const onConfirm = useSelector(selectModalOnConfirm)
	const onCancel = useSelector(selectModalOnCancel)

	if (!isOpen) {
		return null
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="110px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="110px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	)
}

export const Modal = styled(ModalContainer)`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 20;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(16, 214, 204, 0.43);
	}

	& .box {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		// flex-direction: row;
		// flex-wrap: nowrap;
		// align-items: center;
		// align-content: center;
		// justify-content: space-around;
		top: 50%;
		transform: translate(0, -50%);
		width: 360px;
		margin: 0 auto;
		padding: 20px;
		color: #fff;
		background-color: rgb(19, 164, 156);
		border-radius: 7px;
		box-shadow: #037171 1px 3px 5px;
		z-index: 30;
	}

	& .buttons {
		display: flex;
		// flex-direction: column;
		justify-content: center;
		gap: 20px;
	}
`


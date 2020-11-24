import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Block } from '@styled-icons/boxicons-regular/Block';
import { ArrowLeftShort } from '@styled-icons/bootstrap';
import { ArrowRightShort } from '@styled-icons/bootstrap';
import { Check } from '@styled-icons/remix-fill';

const ButtonBox = styled.div`
	width: 20vw;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	${({ theme }) =>
		theme.query.bigMobile({
			display: 'none',
		})}
`;
const MobileButtonBox = styled(ButtonBox)`
	display: none;
	${({ theme }) =>
		theme.query.bigMobile({
			display: 'flex',
		})}
`;

const SVG = styled.button`
	z-index: 1;
	border: 0px solid transparent;
	cursor: pointer;
	background: transparent;
	svg {
		border: 2px solid black;
		width: 50px;
		border-radius: 50%;
	}
`;

const Buttons = ({ content, handleClick, mobile}) => {
	const Selected = {
		first: Block,
		next: ArrowRightShort,
		back: ArrowLeftShort,
		done: Check,
	}[content];

	const ResponsiveButton = ({ children }) => {
		if (mobile) {
			return <MobileButtonBox>{children}</MobileButtonBox>;
		}
		return <ButtonBox>{children}</ButtonBox>;
	};

	return (
		<ResponsiveButton>
			<SVG id={content} onClick={handleClick}>
				<Selected />
			</SVG>
		</ResponsiveButton>
	);
};

export default Buttons;

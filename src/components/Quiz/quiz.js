import React, { useState } from 'react';
import styled from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import ButtonArrow from './ComponentsQuiz/button-arrow';
import Navbar from '../Navbar/navbar';

const QuizWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: #f1f1f1;
	display: flex;
	justify-content: center;
	align-items: center;
	${({ theme }) =>
		theme.query.bigMobile({
			display: 'flex',
			'flex-direction': 'column',
			'justify-content': 'center',
			'align-items': 'center',
		})}
`;

const QuizBox = styled.div`
	color: black;
	width: 43vw;
	height: 100%;
	${({ theme }) =>
		theme.query.bigDesktop({
			width: '50vw',
		})}
	${({ theme }) =>
		theme.query.desktop({
			width: '65vw',
		})}
	${({ theme }) =>
		theme.query.smallDesktop({
			width: '80vw',
		})}
	${({ theme }) =>
		theme.query.bigMobile({
			height: 'auto',
			width: '90vw',
		})}
`;

const MobileStyle = styled.div`
	display: none;
	${({ theme }) =>
		theme.query.bigMobile({
			display: 'flex',
			'justify-content': 'space-around',
			'align-items': 'center',
			width: '100%',
		})}
`;

const MobileButtonArrow = ({ handleClick }) => {
	return (
		<MobileStyle>
			<ButtonArrow mobile handleClick={handleClick} content='back' />
			<ButtonArrow mobile handleClick={handleClick} content='next' />
		</MobileStyle>
	);
};

const Quiz = ({ children, state, dispatch }) => {
	const [slideTransition, setSlideTransition] = useState(true);
	const quizLenght = Object.keys(state.quizData).length - 1;
	const quizIndex = state.questionIndex;

	const handleClick = (e) => {
		dispatch({ type: e.currentTarget.id });
		if (e.currentTarget.id === 'next') return setSlideTransition('next');
		return setSlideTransition('back');
	};
	const getButtonArrowContent = () => {
		return quizIndex === 0 ? 'first' : 'back';
	};

	return (
		<QuizWrapper>
			<Navbar />
			<ButtonArrow handleClick={handleClick} content={getButtonArrowContent()} />
			<QuizBox>
				<TransitionGroup
					style={{ display: 'flex' }}
					childFactory={(child) => React.cloneElement(child, { classNames: slideTransition, timeout: 1000 })}>
					<CSSTransition key={state.questionIndex} timeout={1000} classNames={slideTransition}>
						{children}
					</CSSTransition>
				</TransitionGroup>
			</QuizBox>
			<ButtonArrow handleClick={handleClick} content={quizIndex === quizLenght ? 'done' : 'next'} />
			<MobileButtonArrow handleClick={handleClick} />
		</QuizWrapper>
	);
};

export default Quiz;

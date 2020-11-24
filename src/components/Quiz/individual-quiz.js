import React, { useState, useReducer, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import Quiz from './quiz';
import IndividualHeader from './IndividualQuiz/individual-header';
import IndividualBody from './IndividualQuiz/individual-body';
import quizData from '../../data/individual-carbon-data';

const QuestionsWrapper = styled.div`
	height: 100%;
	width: 100%;

	${({ theme }) =>
		theme.query.bigMobile({
			height: 'auto',
		})}

	&.next-enter {
		transform: translateX(100vw);
		${({ theme }) =>
			theme.query.bigMobile({
				transform: 'translateX(180vw)',
			})}
	}
	&.next-enter-active {
		transform: translateX(0%);
		transition: transform 1000ms ease-in-out;
		${({ theme }) =>
			theme.query.bigMobile({
				transform: 'translateX(0vw)',
				transition: 'transform 1000ms ease-in-out',
			})}
	}
	&.next-exit {
		transform: translateX(-50vw);
		${({ theme }) =>
			theme.query.bigMobile({
				transform: 'translateX(-80vw)',
			})}
	}
	&.next-exit-active {
		transform: translateX(-200vw);
		transition: transform 1000ms ease-in-out;
		${({ theme }) =>
			theme.query.bigMobile({
				transform: 'translateX(-200vw)',
				transition: 'transform 1000ms ease-in-out',
			})}
	}

	&.back-enter {
		transform: translateX(-100vw);
	}
	&.back-enter-active {
		transform: translateX(0%);
		transition: transform 1000ms ease-in-out;
	}
	&.back-exit {
		transform: translateX(-50vw);
		${({ theme }) =>
			theme.query.bigMobile({
				transform: 'translateX(-80vw)',
			})}
	}
	&.back-exit-active {
		transform: translateX(100vw);
		transition: transform 1000ms ease-in-out;
	}
`;

const reducer = (state, action) => {
	const questionsLenght = Object.keys(state.quizData).length - 1;
	let questionIndex = state.questionIndex;
	let newState = { ...state };
	switch (action.type) {
		case 'next':
			if (questionIndex === questionsLenght) return state;
			return { ...state, questionIndex: questionIndex + 1 };
		case 'done':
			return state;
		case 'back':
		case 'first':
			if (questionIndex === 0) return state;
			return { ...state, questionIndex: questionIndex - 1 };
		case 'reset':
			return { ...state, questionIndex: 0 };
		case 'quizSlider':
			newState.quizData[questionIndex].simpleState.slider = action.value;
			return newState;
		case 'quizInput':
			newState.quizData[questionIndex].complexState.savedValue[action.name] = action.value;
			return newState;
		case 'quizState':
			newState.quizData[questionIndex].quizType = !action.payload;
			return newState;
		default:
			throw new Error('Unexpected action');
	}
};

const initialState = {
	quizData: { ...quizData },
	questionIndex: 0,
};

const IndividualQuiz = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<Quiz state={state} dispatch={dispatch}>
			<QuestionsWrapper>
				<IndividualHeader state={state} />
				<IndividualBody state={state} dispatch={dispatch} />
			</QuestionsWrapper>
		</Quiz>
	);
};

export default IndividualQuiz;

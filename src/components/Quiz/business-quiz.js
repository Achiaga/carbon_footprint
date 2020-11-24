import React, { useState, useReducer } from 'react';
import styled from 'styled-components';

import Quiz from './quiz';
import quizData from '../../data/business-carbon-data';
import BuisnessHeader from './BusinessQuiz/buisness-header';
import BuisnessBody from './BusinessQuiz/buisness-body';
import ButtonRows from './BusinessQuiz/button-rows';

const BuisnessWrapper = styled.div`
	height: 100%;
	width: inherit;
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
	let newState = { ...state };
	let questionIndex = state.questionIndex;
	let currentQuizState = newState.quizData[questionIndex];

	switch (action.type) {
		case 'next':
			const questionsLenght = Object.keys(state.quizData).length - 1;
			if (state.questionIndex === questionsLenght) return state;
			return { ...state, questionIndex: questionIndex + 1 };
		case 'done':
			return state;
		case 'back':
		case 'first':
			if (questionIndex === 0) return state;
			return { ...state, questionIndex: questionIndex - 1 }
		case 'reset':
			return { ...state, questionIndex: 0 };
		case 'addRow':
			const newRow = { ...currentQuizState.rowStructure[0] };
			currentQuizState.rowStructure.push(newRow);
			currentQuizState.savedValue.push(newRow);
			console.log(newState);
			return newState;
		case 'deleteRow':
			if (currentQuizState.rowStructure.length <= 2) return newState;
			currentQuizState.rowStructure.pop();
			currentQuizState.savedValue.pop();
			return newState;
		case 'handleInput':
			currentQuizState.savedValue[action.row][action.name] = action.value;
			return newState;
		default:
			throw new Error('Unexpected action');
	}
};

const initialState = {
	quizData: { ...quizData },
	questionIndex: 0,
};

const BusinessQuiz = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// const handleAddRow = () => {
	// 	const newScreenState = {
	// 		...formState[questionIndex],
	// 		rowStructure: [...formState[questionIndex].rowStructure, { ...formState[questionIndex].rowsType[0] }],
	// 	};
	// 	setFormState({
	// 		...formState,
	// 		[questionIndex]: newScreenState,
	// 	});
	// };

	// const handleDeleteQuestion = () => {
	// 	const newScreenState = {
	// 		...formState[questionIndex],
	// 	};
	// 	newScreenState.rowStructure.pop();
	// 	setFormState({
	// 		...formState,
	// 		[questionIndex]: newScreenState,
	// 	});
	// };

	return (
		<Quiz state={state} dispatch={dispatch}>
			<BuisnessWrapper>
				<BuisnessHeader state={state} />
				<BuisnessBody state={state} dispatch={dispatch} />
				<ButtonRows dispatch={dispatch} />
			</BuisnessWrapper>
		</Quiz>
	);
};

export default BusinessQuiz;

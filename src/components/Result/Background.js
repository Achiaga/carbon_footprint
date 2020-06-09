import React from 'react';
import styled from 'styled-components';
import './background.css';

const BackgroundWrapper = styled.div`
	height: 100vh;
	background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
	overflow: hidden;
`;

const ResultsBackground = ({ children }) => {
	return (
		<BackgroundWrapper>
			<div id='stars'></div>
			<div id='stars2'></div>
			<div id='stars3'></div>
			<div id='title'>{children}</div>
		</BackgroundWrapper>
	);
};

export default ResultsBackground;

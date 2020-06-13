import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { businessCarbonData } from '../../data/carbon/businessCarbonData';
import { ResultIndividualCarbonData } from '../../data/carbon/ResultIndividualCarbonData';
import { ResultIndividualWaterData } from '../../data/water/ResultIndividualWaterData';
import { mediaCarbonData } from '../../data/carbon/media-carbon-data';
import { mediaWaterData } from '../../data/water/media-water-data';
import { fakeData } from '../../data/fakeData';
import ResultsBackground from './Background';
import logo from '../../assets/logo.png';
import earth from '../../assets/earth.png';

const ResultWrapper = styled.div`
	color: #000;
	height: 100vh;
	font-family: 'Roboto', sans-serif;
	color: white;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
`;
const Box = styled.div`
	margin: auto;
`;

const LogoWrapper = styled.div`
	position: absolute;
	width: inherit;
	left: 1em;
`;
const LogoStyle = styled.img`
	width: 12vw;
	margin: auto;
	@media (max-width: 640px) {
		width: 25vw;
	}
`;

const TitleResult = styled.h1`
	text-transform: uppercase;
`;

const SubTitleResult = styled.h3`
	padding-top: 0.3em;
	font-weight: 900;
	margin: auto;

	margin-bottom: 1.5em;
`;

const DataResult = styled.div`
	display: flex;
	margin: auto;
	justify-content: center;
	align-items: center;
`;

const DataResultTitle = styled.h1`
	margin: 0px 10px;
	padding: 0px;
	font-size: 40px;
`;
const DataResultExtra = styled.h3`
	margin: 0;
	padding: 0px;
`;

const AwarenessText = styled.div`
	font-size: 20px;
	margin: auto;
	margin-top: 1.5em;
	margin-bottom: 0.5em;
	padding: 0px 20px;
`;
const AwarenessResult = styled.div`
	font-size: 40px;
	margin: auto;
	margin-bottom: 0.5em;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const AwarenessWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 80vw;
	margin: auto;
`;
const AwarenessImg = styled.img`
	width: 15vw;
	margin: auto;
`;
const AwarenessButton = styled.button`
	background: -webkit-linear-gradient(white, #38495a);
	border-radius: 20px;
	margin: 1em;
	border-radius: 2px;
	padding: 0.5em;
	font-size: 12px;
	&:hover {
		cursor: pointer;
	}
`;

export function Result({}) {
	let result = 0;

	const stateScreen = fakeData;
	console.log(stateScreen);

	if (stateScreen.formState && stateScreen.formState[0].type === 'business') {
		Object.keys(stateScreen.formState).map((key) => {
			Object.keys(stateScreen.formState[key].rowStructure).map((i) => {
				let energy = stateScreen.formState[key].rowStructure[i].energyType;
				let quantity = stateScreen.formState[key].rowStructure[i].quantity;
				if (energy && quantity) {
					result =
						result + Number(quantity) * Number(businessCarbonData[key][energy]);
				}
			});
		});
	} else if (
		stateScreen.formState &&
		stateScreen.formState[0].type === 'individual' &&
		stateScreen.formState[0].footprint === 'carbon'
	) {
		Object.keys(stateScreen.formState).map((key) => {
			let frecuency = stateScreen.formState[key].rowStructureSimple['slider'];
			let combustion = stateScreen.formState[key].rowStructureSimple['car'];
			let eficiencyCar =
				stateScreen.formState[key].rowStructureSimple['eficiency'];
			let moto = stateScreen.formState[key].rowStructureSimple['moto'];
			let title = stateScreen.formState[key].simpleName;
			let frecuencyMultiplier;
			if (frecuency < 1) {
				frecuencyMultiplier = 0;
			} else if (frecuency < 3) {
				frecuencyMultiplier = 1 / 3;
			} else if (frecuency < 5) {
				frecuencyMultiplier = 1;
			} else if (frecuency < 7) {
				frecuencyMultiplier = 1.5;
			} else if (frecuency < 9) {
				frecuencyMultiplier = 3;
			} else if (frecuency <= 10) {
				frecuencyMultiplier = 5;
			}
			if (stateScreen.formState[key].ComplexFormState === false) {
				let footprintFactor = ResultIndividualCarbonData[key][title];
				let footprintFactorCar = ResultIndividualCarbonData[key][combustion];
				let footprintFactorMoto = ResultIndividualCarbonData[key][moto];
				let averageConsume = mediaCarbonData[key][title];
				if (footprintFactor) {
					console.log('SimpleElectricity', footprintFactor);
					result =
						result +
						Number(averageConsume) *
							Number(frecuencyMultiplier) *
							Number(footprintFactor);
				}
				if (footprintFactorCar) {
					console.log('SimpleCar', footprintFactorCar);
					result =
						Number(result) +
						Number(averageConsume) *
							Number(frecuencyMultiplier) *
							Number(footprintFactorCar) *
							(Number(eficiencyCar) / 100);
				}
				if (moto) {
					console.log('SimpleMoto', moto);
					result =
						Number(result) +
						Number(averageConsume) *
							Number(frecuencyMultiplier) *
							Number(footprintFactorMoto);
				}
			}
			if (stateScreen.formState[key].ComplexFormState === true) {
				if (key === '1') {
					let quantity =
						stateScreen.formState[key].rowStructureComplex[0][
							'Km recorridos al año'
						];
					let eficiency =
						stateScreen.formState[key].rowStructureComplex[0][
							'Eficiencia Del Vehiculo'
						];
					let combustible =
						stateScreen.formState[key].rowStructureComplex[0][
							'Tipo de Combustible'
						];
					let carFactor = ResultIndividualCarbonData[key][combustible];
					if (carFactor) {
						console.log('car', carFactor);
						result =
							Number(result) +
							Number(quantity) * Number(carFactor) * Number(eficiency);
					}
				} else if (key === '2') {
					let quantity =
						stateScreen.formState[key].rowStructureComplex[0][
							'Km Recorridos al año'
						];
					let cilindrada =
						stateScreen.formState[key].rowStructureComplex[0][
							'Cilindarada Motocicleta'
						];
					let motoFactor = ResultIndividualCarbonData[key][cilindrada];
					if (motoFactor) {
						console.log('moto', motoFactor);
						result = Number(result) + Number(quantity) * Number(motoFactor);
					}
				}
				Object.keys(stateScreen.formState[key].rowStructureComplex[0]).map(
					(i) => {
						let quantity = stateScreen.formState[key].rowStructureComplex[0][i];
						let footprintFactor = ResultIndividualCarbonData[key][i];
						if (quantity && footprintFactor && key !== '1' && key !== '2') {
							console.log(i);
							if (key === '6') {
								result =
									Number(result) +
									Number(quantity) * Number(footprintFactor) * 12;
							} else {
								result =
									Number(result) + Number(quantity) * Number(footprintFactor);
							}
						}
					}
				);
			}
		});
	} else if (
		stateScreen.formState &&
		stateScreen.formState[0].footprint === 'water'
	) {
		Object.keys(stateScreen.formState).map((key) => {
			if (stateScreen.formState[key].ComplexFormState === true) {
				Object.keys(stateScreen.formState[key].rowStructureComplex).map((i) => {
					const quantity = stateScreen.formState[0].rowStructureComplex[i];
					const waterFactor = ResultIndividualWaterData[0][i];
					if (quantity && waterFactor) {
						result = Number(result) + Number(quantity) * Number(waterFactor);
					}
				});
			}
			if (stateScreen.formState[key].ComplexFormState === false) {
				Object.keys(stateScreen.formState[key].rowStructureSimple).map((i) => {
					const frecuency = stateScreen.formState[0].rowStructureSimple[i];
					const waterFactor = ResultIndividualWaterData[0][i];
					const mediaQuantity = mediaWaterData[0][i];
					let frecuencyQuantity;
					if (frecuency < 1) {
						frecuencyQuantity = 0;
					} else if (frecuency < 3) {
						frecuencyQuantity = 1 / 3;
					} else if (frecuency < 5) {
						frecuencyQuantity = 1;
					} else if (frecuency < 7) {
						frecuencyQuantity = 1.5;
					} else if (frecuency < 9) {
						frecuencyQuantity = 3;
					} else if (frecuency <= 10) {
						frecuencyQuantity = 5;
					}
					if (mediaQuantity && waterFactor) {
						console.log('frecuencyQuantity', frecuencyQuantity);
						console.log('waterFactor', waterFactor);
						console.log('mediaQuantity', mediaQuantity);
						result =
							Number(result) +
							Number(frecuencyQuantity) *
								Number(waterFactor) *
								Number(mediaQuantity);
					}
				});
			}
		});
	}

	result = result / 1000;
	result = result.toFixed(2);
	console.log(result);

	const countEarths = 5;
	const units =
		stateScreen.formState[0].footprint === 'water' ? 'm3 of water' : 'ton CO2';

	return (
		<>
			<ResultsBackground />
			<ResultWrapper>
				<LogoWrapper>
					<Link to='/'>
						<LogoStyle src={logo} alt='logo' />
					</Link>
				</LogoWrapper>
				<Box>
					<TitleResult>Congratulations 🥳🥳</TitleResult>
					<SubTitleResult>Your carbon footprint is :</SubTitleResult>
					<DataResult>
						<DataResultTitle> {result} </DataResultTitle>
						<DataResultExtra> {units} </DataResultExtra>
						<AwarenessButton>See How</AwarenessButton>
					</DataResult>
					<AwarenessText>
						If everybody had your lifestyle, we would need
					</AwarenessText>
					<AwarenessResult>
						{countEarths} Earths<AwarenessButton>See How</AwarenessButton>
					</AwarenessResult>
					<AwarenessWrapper>
						<AwarenessImg src={earth}></AwarenessImg>
						<AwarenessImg src={earth}></AwarenessImg>
						<AwarenessImg src={earth}></AwarenessImg>
						<AwarenessImg src={earth}></AwarenessImg>
						<AwarenessImg src={earth}></AwarenessImg>
					</AwarenessWrapper>
				</Box>
			</ResultWrapper>
		</>
	);
}

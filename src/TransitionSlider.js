import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { useTransition, animated } from 'react-spring';
import ReactLogo from './images/reactjs.png';
import VueLogo from './images/vue.png';
import AngularLogo from './images/angular.png';
import ReduxLogo from './images/redux.png';
import NodeLogo from './images/nodejs.png';

const SliderButton = styled(Button)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	${props =>
		props.dir === 'left' &&
		css`
			left: 10px;
		`}
	${props =>
		props.dir === 'right' &&
		css`
			right: 10px;
		`}
`;

const SliderWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
`;

const Slide = styled(animated.div)`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: ${props => (props.bg ? props.bg : 'white')};
	display: flex;
	justify-content: center;
	align-items: center;
	will-change: opacity, transform;
`;

const slideData = [
	{ key: 1, logo: ReactLogo, bgColor: '#6c93a8' },
	{ key: 2, logo: VueLogo, bgColor: '#6fbb9d' },
	{ key: 3, logo: AngularLogo, bgColor: '#c16c7d' },
	{ key: 4, logo: ReduxLogo, bgColor: '#a8aed3' },
	{ key: 5, logo: NodeLogo, bgColor: '#85c199' }
];

const slides = slideData.map(s => {
	return ({ style }) => (
		<Slide style={style} bg={s.bgColor}>
			<img src={s.logo} alt="SPA logo" />
		</Slide>
	);
});

const TransitionSlider = () => {
	const [state, setState] = useState({ index: 0, ltr: true });

	const { index, ltr } = state;

	function handleNextSlide() {
		const slideIndex = index === slideData.length - 1 ? 0 : index + 1;
		setState({ index: slideIndex, ltr: true });
	}
	function handlePrevSlide() {
		const slideIndex = index === 0 ? slideData.length - 1 : index - 1;
		setState({ index: slideIndex, ltr: false });
	}

	const transitions = useTransition(index, p=>p, {
		from: { opacity: 0, transform: `translate3d(${ltr ? '100%' : '-100%'},0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: `translate3d(${ltr ? '-50%' : '50%'},0,0)` },
	});

	return (
		<SliderWrapper>
			{transitions.map(({ item, key, props }) => {
				const Slider = slides[item];
				return <Slider key={key} style={props} />;
			})}
			<SliderButton
				shape="circle"
				icon="left"
				dir="left"
				onClick={handlePrevSlide}
			/>
			<SliderButton
				shape="circle"
				icon="right"
				dir="right"
				onClick={handleNextSlide}
			/>
		</SliderWrapper>
	);
};

export default TransitionSlider;

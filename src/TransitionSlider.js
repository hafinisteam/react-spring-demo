import React, { useState } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { Select } from 'antd';
import ReactLogo from './images/reactjs.png';
import VueLogo from './images/vue.png';
import AngularLogo from './images/angular.png';
import ReduxLogo from './images/redux.png';
import NodeLogo from './images/nodejs.png';

const Option = Select.Option;

const SliderWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	cursor: pointer;
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
	backface-visibility: hidden;
	transform-style: preserve-3d;
`;

const SelectWrapper = styled.div`
	text-align: center;
	position: relative;
	z-index: 3;
	padding-top: 20px;
`;

const slideData = [
	{ key: 1, logo: ReactLogo, bgColor: '#6c93a8' },
	{ key: 2, logo: VueLogo, bgColor: '#6fbb9d' },
	{ key: 3, logo: AngularLogo, bgColor: '#c16c7d' },
	{ key: 4, logo: ReduxLogo, bgColor: '#a8aed3' },
	{ key: 5, logo: NodeLogo, bgColor: '#85c199' }
];

const slides = slideData.map(s => {
	return ({ style, ...rest }) => (
		<Slide style={style} bg={s.bgColor} {...rest}>
			<img src={s.logo} alt="SPA logo" />
		</Slide>
	);
});

const animations = {
	slideInHoz: {
		ani: {
			from: {
				opacity: 0,
				transform: `translate3d(100%,0,0)`
			},
			enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
			leave: { opacity: 0, transform: `translate3d(-50%,0,0)` }
		},
		name: 'Horizontal Slide'
	},
	slideInVer: {
		ani: {
			from: {
				opacity: 0,
				transform: `translate3d(0,100%,0)`
			},
			enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
			leave: { opacity: 0, transform: `translate3d(0,-50%,0)` }
		},
		name: 'Vertical Slide'
	},
	fade: {
		ani: {
			from: {
				opacity: 0
			},
			enter: { opacity: 1 },
			leave: { opacity: 0 }
		},
		name: 'Fade In Out'
	},
	flipCardHoz: {
		ani: {
			from: { opacity: 0, perspective: '2000px', transform: 'rotateY(180deg)' },
			enter: { opacity: 1, transform: 'rotateY(0)' },
			leave: { opacity: 0, transform: 'rotateY(180deg)' },
			config: { mass: 5, tension: 500, friction: 80 }
		},
		name: 'Horizontal Flip card'
	},
	flipCardVer: {
		ani: {
			from: { opacity: 0, perspective: '2000px', transform: 'rotateX(180deg)' },
			enter: { opacity: 1, transform: 'rotateX(0)' },
			leave: { opacity: 0, transform: 'rotateX(180deg)' },
			config: { mass: 5, tension: 500, friction: 80 }
		},
		name: 'Vertical Flip card'
	}
};

const TransitionSlider = () => {
	const [state, setState] = useState({
		index: 0,
		aniStyle: animations.slideInHoz.ani
	});

	const { index, aniStyle } = state;

	function handleNext() {
		const slideIndex = index === slideData.length - 1 ? 0 : index + 1;
		setState({ ...state, index: slideIndex });
	}

	function handleChange(value) {
		setState({ ...state, aniStyle: animations[value].ani });
	}

	const transitions = useTransition(index, p => p, aniStyle);

	const aniKeys = Object.keys(animations);

	return (
		<SliderWrapper>
			<SelectWrapper>
				<Select
					defaultValue={aniKeys[0]}
					style={{ width: 200 }}
					onChange={handleChange}
				>
					{aniKeys.map(k => (
						<Option value={k} key={animations[k].name}>
							{animations[k].name}
						</Option>
					))}
				</Select>
			</SelectWrapper>
			{transitions.map(({ item, key, props }) => {
				const Slider = slides[item];
				return <Slider key={key} style={props} onClick={handleNext} />;
			})}
		</SliderWrapper>
	);
};

export default TransitionSlider;

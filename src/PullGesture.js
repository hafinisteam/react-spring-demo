import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, interpolate, config } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const AnimatedBall = styled(animated.div)`
	font-size: 30px;
	width: 100px;
	height: 100px;
	background-color: #ff6a84;
	border-radius: 50%;
	cursor: -webkit-grabbing;
`;

function PullGesture() {
	const [props, set] = useSpring(() => ({
		background: '#ff6a84',
		x: 0,
		y: 0,
		scale: 1,
		opacity: 1,
		config: config.gentle
	}));
	const bind = useGesture({
		onDrag: ({ delta, down }) => {
			set({
				x: down ? delta[0] : 0,
				y: down ? delta[1] : 0,
				background: down ? '#6a94ff' : '#ff6a84',
				opacity: down ? 0.7 : 1
			});
		},
		onWheel: () => {
			set({
				scale: props.scale.value + 0.05
			});
		}
	});
	const { background, x, y, scale, opacity } = props;
	return (
		<AnimatedBall
			{...bind()}
			style={{
				background,
				transform: interpolate(
					[x, y, scale],
					(x, y, scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`
				),
				opacity
			}}
		/>
	);
}

export default PullGesture;

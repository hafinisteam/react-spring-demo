import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

export const SwitchContainer = styled(animated.div)`
	position: relative;
	overflow: hidden;
	height: 450px;
`;

export const SwitchWrapper = styled.div`
	margin: 40px auto;
	width: 600px;
	height: 370px;
	background: #fff;
	border-radius: 6px;
	overflow: hidden;
	position: relative;
`;

export const SwitchButton = styled(animated.div)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	font-size: 18px;
	${props =>
		props.side === 'prev' &&
		css`
			left: 10px;
		`}
	${props =>
		props.side === 'next' &&
		css`
			right: 10px;
		`}
  cursor: pointer;
`;

export const DetailWrapper = styled.div`
	width: 50%;
	display: inline-block;
	height: 100%;
	position: relative;
	overflow: hidden;
`;

export const DetailInner = styled(animated.div)`
	width: 100%;
	height: 100%;
  position: absolute;
  will-change: transform, opacity;
`;

export const DetailBase = styled(animated.div)`
	position: absolute;
	img {
		width: 100%;
	}
`;

export const DetailMap = styled(DetailBase)`
	width: 250px;
	top: 60px;
	left: 30px;
	${props =>
		props.map2 &&
		css`
			width: 200px;
			left: 50px;
		`}
`;

export const DetailPic = styled(DetailBase)`
	width: 220px;
	top: 100px;
	left: 40px;
`;

export const DetailInfo = styled(animated.div)`
	padding: 40px;
	will-change: transform, opacity;
	p {
		font-size: 12px;
	}
	span {
		height: 2px;
		width: 60px;
		border-radius: 2px;
		display: block;
		margin-bottom: 5px;
	}
`;

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Icon } from 'antd';

const SwitchContainer = styled(animated.div)`
	position: relative;
	overflow: hidden;
	height: 450px;
`;

const SwitchWrapper = styled.div`
	margin: 40px auto;
	width: 600px;
	height: 370px;
	background: #fff;
	border-radius: 6px;
	overflow: hidden;
	position: relative;
`;

const SwitchButton = styled(animated.div)`
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

let dataArray = [
	{
		pic: 'https://zos.alipayobjects.com/rmsportal/ogXcvssYXpECqKG.png',
		map: 'https://zos.alipayobjects.com/rmsportal/HfBaRfhTkeXFwHJ.png',
		color: '#FFF43D',
		background: '#F6B429'
	},
	{
		pic: 'https://zos.alipayobjects.com/rmsportal/iCVhrDRFOAJnJgy.png',
		map: 'https://zos.alipayobjects.com/rmsportal/XRfQxYENhzbfZXt.png',
		color: '#FF4058',
		background: '#FC1E4F'
	},
	{
		pic: 'https://zos.alipayobjects.com/rmsportal/zMswSbPBiQKvARY.png',
		map: 'https://zos.alipayobjects.com/rmsportal/syuaaBOvttVcNks.png',
		color: '#9FDA7F',
		background: '#64D487'
	}
];

const DetailSwitch = () => {
	const [index, setIndex] = useState(0);
	const [{ bg }, setBg] = useSpring(() => ({
		bg: dataArray[index].background
	}));
	return (
		<SwitchContainer style={{ background: bg }}>
			<SwitchWrapper>
				<SwitchButton side="prev">
					<Icon type="left" />
				</SwitchButton>
				<SwitchButton side="next">
					<Icon type="right" />
				</SwitchButton>
			</SwitchWrapper>
		</SwitchContainer>
	);
};

export default DetailSwitch;

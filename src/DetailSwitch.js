import React, { useState } from 'react';
import { useSpring, useTransition, interpolate, config } from 'react-spring';
import { Icon } from 'antd';
import produce from 'immer';
import {
	SwitchContainer,
	SwitchWrapper,
	SwitchButton,
	DetailWrapper,
	DetailInner,
	DetailMap,
	DetailPic,
	DetailInfo
} from './styles/DetailDemo';

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

const detailMapSlides = dataArray.map((data, index) => {
	return ({ style }) => {
		const { translateX } = style;

		return (
			<DetailInner
				style={{
					background: data.color,
					transform: translateX.interpolate(x => `translate3d(${x}px,0,0)`)
				}}
			>
				<div>
					<DetailMap>
						<img src={data.map} alt="Detail map" />
					</DetailMap>
					<DetailPic>
						<img src={data.pic} alt="Detail motor" />
					</DetailPic>
				</div>
			</DetailInner>
		);
	};
});

const detailInfoSlides = dataArray.map((data, index) => {
	return ({ style }) => {
		const { translateX, translateY, opacity } = style;
		
		return (
			<DetailInfo
				style={{
					opacity: opacity.interpolate(o => `${o}`),
					// transform: interpolate(
					// 	[translateX, translateY],
					// 	(x, y) => `translate3d(${x}px, ${y}px, 0)`
					// )
				}}
			>
				<h5>Motorcycle</h5>
				<span style={{ background: data.background }} />
				<p>
					Taiwan called motorcycle, motor bike [1] or a motorcycle, the
					motorcycle referred to in the mainland, Hong Kong and Southeast Asia
					known as motorcycles [2], is a driven by the engine, operated by a
					hand or two directions three-wheeled vehicles, is a means of
					transport. In some military or police applications, will add a side
					compartment and a secondary wheel, become a special three-wheeled
					motorcycle, mobility Zheyi common plug-in auxiliary wheels.
				</p>
			</DetailInfo>
		);
	};
});

const RenderAniBtn = props => {
	const { transitions, onClick, side, iconType, isShow } = props;
	return transitions.map(
		({ key, styleProps }) =>
			isShow && (
				<SwitchButton
					side={side}
					onClick={onClick}
					style={styleProps}
					key={key}
				>
					<Icon type={iconType} />
				</SwitchButton>
			)
	);
};

const baseTransX = (isLeft = true) => ({
	from: {
		translateX: isLeft ? 300 : -300
	},
	enter: {
		translateX: 0
	},
	leave: {
		translateX: isLeft ? -300 : 300
	}
});

const useInfoSwitch = (index, isLeft = true, config = {}) => {
	return useTransition(index, null, {
		from: {
			translateY: -50,
			translateX: 0,
			opacity: 0
		},
		enter: {
			translateY: 0,
			translateX: 0,
			opacity: 1
		},
		leave: {
			translateX: isLeft ? -300 : 300,
			opacity: 0
		},
		...config
	});
};

const useTransX = (index, isLeft = true, config) => {
	return useTransition(index, null, {
		...baseTransX(isLeft),
		config
	});
};

const DetailSwitch = () => {
	const [{ index, isLeft }, setState] = useState({ index: 0, isLeft: 'left' });
	const { bg } = useSpring({
		bg: dataArray[index].background,
		config: { duration: 500 }
	});

	const btnTransition = useTransition(index, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

	const detailMapTransition = useTransX(index, isLeft, (key, state) => {
		return { mass: 5, tension: 500, friction: 100 };
	});

	// const detailInfoTransition = useInfoSwitch(index, isLeft);

	const detailInfoTransition = useTransition(index, null, {
		from: {opacity: 0},
		enter: {opacity: 1},
		leave: {opacity: 0}
	});

	console.log(detailInfoTransition)

	function prev() {
		setState({ index: index - 1, isLeft: false });
	}

	function next() {
		setState({ index: index + 1, isLeft: true });
	}

	return (
		<SwitchContainer style={{ background: bg }}>
			<SwitchWrapper>
				<DetailWrapper>
					{detailMapTransition.map(({ item, key, props }) => {
						const Map = detailMapSlides[item];
						return <Map key={key} style={props} />;
					})}
				</DetailWrapper>
				<DetailWrapper>
					{detailInfoTransition.map(({ item, key, props }) => {
						const Info = detailInfoSlides[item];
						return <Info key={key} style={props} />;
					})}
				</DetailWrapper>
				<RenderAniBtn
					transitions={btnTransition}
					side="prev"
					iconType="left"
					onClick={prev}
					isShow={index > 0}
				/>
				<RenderAniBtn
					transitions={btnTransition}
					side="next"
					iconType="right"
					onClick={next}
					isShow={index < dataArray.length - 1}
				/>
			</SwitchWrapper>
		</SwitchContainer>
	);
};

export default DetailSwitch;

import React, { useState } from 'react';
import { useSpring, useTransition, interpolate } from 'react-spring';
import { Icon } from 'antd';
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

const detailSlides = dataArray.map((data, index) => {
	return ({ style }) => {
		const { opacity, translateX, translateY, display } = style;
		console.log(style);
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
				// <DetailWrapper>
				// 	<DetailInfo>
				// 		<h5>Motorcycle</h5>
				// 		<span style={{ background: data.background }} />
				// 		<p>
				// 			Taiwan called motorcycle, motor bike [1] or a motorcycle, the
				// 			motorcycle referred to in the mainland, Hong Kong and Southeast
				// 			Asia known as motorcycles [2], is a driven by the engine, operated
				// 			by a hand or two directions three-wheeled vehicles, is a means of
				// 			transport. In some military or police applications, will add a
				// 			side compartment and a secondary wheel, become a special
				// 			three-wheeled motorcycle, mobility Zheyi common plug-in auxiliary
				// 			wheels.
				// 		</p>
				// 	</DetailInfo>
				// </DetailWrapper>
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

const DetailSwitch = () => {
	const [{ index, order }, setState] = useState({ index: 0, order: 'left' });
	const { bg } = useSpring({
		bg: dataArray[index].background,
		config: { duration: 500 }
	});

	const btnTransition = useTransition(index, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

	const detailTransition = useTransition(index, null, {
		from: {
			opacity: 0,
			translateX: 300,
			translateY: 100
		},
		enter: {
			opacity: 1,
			translateX: 0,
			translateY: 0
		},
		leave: {
			opacity: 0,
			translateX: -300
		}
	});

	function prev() {
		setState({ index: index - 1, order: 'right' });
	}

	function next() {
		setState({ index: index + 1, order: 'left' });
	}
	console.log(detailSlides);

	return (
		<SwitchContainer style={{ background: bg }}>
			<SwitchWrapper>
				<DetailWrapper>
					{detailTransition.map(({ item, key, props }) => {
						const Detail = detailSlides[item];
						return <Detail key={key} style={props} />;
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

import React from 'react';
import styled, { css } from 'styled-components';
import random from 'lodash/random';
import { Typography, Tag, Divider } from 'antd';
import PullGesture from './PullGesture';
import MenuToggle from './MenuToggle';
import TodoList from './TodoList';

const { Title, Paragraph } = Typography;

const Wrapper = styled.div`
	> div.demo {
		position: relative;
		height: ${props => props.height}px;
		overflow: hidden;
		background: rgb(240, 240, 240);
		${props =>
			props.isCenter &&
			css`
				display: flex;
				justify-content: center;
				align-items: center;
			`}
	}
`;

const tagColors = [
	'magenta',
	'red',
	'volcano',
	'orange',
	'gold',
	'lime',
	'green',
	'cyan',
	'blue',
	'geekblue',
	'purple'
];

const DemoBlock = props => (
	<Wrapper
		className="col-6 mb-4"
		isCenter={props.isCenter}
		height={props.height}
	>
		<Title level={4}>{props.title}</Title>
		<Paragraph>
			<Tag color={tagColors[random(0, tagColors.length, false)]}>
				{props.tag}
			</Tag>
		</Paragraph>
		<div className="demo">{props.children}</div>
	</Wrapper>
);

DemoBlock.defaultProps = {
	isCenter: true,
	height: 300
};

function App() {
	return (
		<div className="container p-3">
			<Title level={2} className="text-center" type="secondary">
				React Spring Demos
			</Title>
			<Divider />
			<div className="row">
				<DemoBlock title="Pull Gesture" tag="USESPRING">
					<PullGesture />
				</DemoBlock>
				<DemoBlock title="Menu Toggle" tag="USESPRING" isCenter={false}>
					<MenuToggle />
				</DemoBlock>
				<DemoBlock
					title="Todo List"
					tag="USETRANSITION"
					isCenter={false}
				>
					<TodoList />
				</DemoBlock>
			</div>
		</div>
	);
}

export default App;

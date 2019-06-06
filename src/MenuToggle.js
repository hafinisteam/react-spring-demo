import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Button, Menu, Icon } from 'antd';

const Wrapper = styled(animated.div)`
	padding: 20px;
	height: 100%;
	background-color: rgb(240, 240, 240);
	position: relative;
	z-index: 2;
`;
const { SubMenu } = Menu;

const SideBarMenu = () => (
	<Menu
		theme="dark"
		defaultSelectedKeys={['1']}
		mode="inline"
		style={{
			position: 'absolute',
			left: 0,
			top: 0,
			zIndex: 1,
			width: '250px'
		}}
	>
		<Menu.Item key="1">
			<Icon type="mail" />
			Navigation One
		</Menu.Item>
		<Menu.Item key="2">
			<Icon type="calendar" />
			Navigation Two
		</Menu.Item>
		<SubMenu
			key="sub1"
			title={
				<span>
					<Icon type="appstore" />
					<span>Navigation Three</span>
				</span>
			}
		>
			<Menu.Item key="3">Option 3</Menu.Item>
			<Menu.Item key="4">Option 4</Menu.Item>
			<SubMenu key="sub1-2" title="Submenu">
				<Menu.Item key="5">Option 5</Menu.Item>
				<Menu.Item key="6">Option 6</Menu.Item>
			</SubMenu>
		</SubMenu>
		<SubMenu
			key="sub2"
			title={
				<span>
					<Icon type="setting" />
					<span>Navigation Four</span>
				</span>
			}
		>
			<Menu.Item key="7">Option 7</Menu.Item>
			<Menu.Item key="8">Option 8</Menu.Item>
			<Menu.Item key="9">Option 9</Menu.Item>
			<Menu.Item key="10">Option 10</Menu.Item>
		</SubMenu>
	</Menu>
);

const MenuToggle = () => {
	const [show, toggle] = useState(false);
	const [menuAnime, setMenuAnime] = useSpring(() => ({
		marginLeft: '0px',
		config: config.gentle
	}));

	setMenuAnime({ marginLeft: show ? '250px' : '0px' });

	return (
		<div
			style={{
				position: 'relative',
				height: '100%'
			}}
		>
			<SideBarMenu />
			<Wrapper style={menuAnime}>
				<Button type="primary" onClick={() => toggle(!show)}>
					{show ? 'Hide' : 'Show'} Menu
				</Button>
			</Wrapper>
		</div>
	);
};

export default MenuToggle;

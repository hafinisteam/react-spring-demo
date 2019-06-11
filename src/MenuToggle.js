import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { Button, Menu, Icon, List } from 'antd';

const Wrapper = styled(animated.div)`
	padding: 20px;
	height: 100%;
	background-color: rgb(240, 240, 240);
	position: relative;
	z-index: 2;
`;

const DropdownWrapper = styled(animated.div)`
	position: absolute;
	left: 0;
	top: 10px;
	transform-origin: 0% 0%;
`;

const { SubMenu } = Menu;

const data = [
	'Racing car sprays burning fuel into crowd.',
	'Japanese princess to wed commoner.'
];

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

const DropDownMenu = () => (
	<List
		header={<div>Header</div>}
		footer={<div>Footer</div>}
		bordered
		dataSource={data}
		renderItem={item => <List.Item>{item}</List.Item>}
		style={{ background: 'white' }}
	/>
);

const initState = {
	sidebar: false,
	dropdown: false
};

const MenuToggle = () => {
	const [menus, toggleMenu] = useState(initState);

	const [menuAni, setMenuAni] = useSpring(() => ({
		mLeft: 0,
		opa: 0,
		scaleY: 0.8,
		config: {
			duration: 200,
			friction: 14,
			tension: 145,
			mass: 1
		}
	}));

	const { sidebar, dropdown } = menus;

	const { mLeft, opa, scaleY } = menuAni;

	setMenuAni({ mLeft: sidebar ? 250 : 0 });

	setMenuAni({ opa: dropdown ? 1 : 0, scaleY: dropdown ? 1 : 0.8 });

	return (
		<div
			style={{
				position: 'relative',
				height: '100%'
			}}
		>
			<SideBarMenu />
			<Wrapper
				style={{
					marginLeft: mLeft.interpolate(mLeft => `${mLeft}px`)
				}}
			>
				<div className="mb-2">
					<Button
						type="primary"
						onClick={() => toggleMenu({ ...menus, sidebar: !sidebar })}
					>
						{sidebar ? 'Hide' : 'Show'} Sidebar
					</Button>
				</div>
				<Button
					type="secondary"
					onClick={() => toggleMenu({ ...menus, dropdown: !dropdown })}
				>
					{dropdown ? 'Hide' : 'Show'} Dropdown
				</Button>
				<div style={{ position: 'relative' }}>
					<DropdownWrapper
						style={{
							opacity: opa,
							transform: scaleY.interpolate(s => `scaleY(${s})`)
						}}
					>
						<DropDownMenu />
					</DropdownWrapper>
				</div>
			</Wrapper>
		</div>
	);
};

export default MenuToggle;

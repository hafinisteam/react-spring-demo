import React, { useReducer, useState, useEffect } from 'react';
import produce from 'immer';
import isEmpty from 'lodash/isEmpty';
import { useTransition, animated } from 'react-spring';
import { Button, Form, Input, Icon, List } from 'antd';

const initTodos = {
	todos: [],
	loading: false
};

const reducer = produce((draft, { type, payload }) => {
	switch (type) {
		case 'add':
			draft.todos.unshift(payload.task);
			return;
		case 'remove':
			draft.todos.splice(payload.index, 1);
			return;
		case 'load_list':
			draft.loading = true;
			return;
		case 'loaded_list':
			draft.loading = false;
			draft.todos = payload.tasks;
			return;
		default:
			return;
	}
});

const ListItem = animated(List.Item);

const createAction = (action, type, payload = {}) => action({ type, payload });

const TodoList = () => {
	const [{ todos, loading }, todoAction] = useReducer(reducer, initTodos);

	const [input, setInput] = useState('');
	const transitions = useTransition(todos, todos.map(item => item.key), {
		from: { opacity: 0, height: 0, padding: '0 10px' },
		enter: { opacity: 1, height: 40 },
		leave: { opacity: 0, height: 0 }
	});

	useEffect(() => {
		createAction(todoAction, 'load_list');
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(json => {
				const tasks = json.map(j => ({ text: j.name, key: j.id }));
				createAction(todoAction, 'loaded_list', { tasks: tasks });
			});
	}, []);

	function handleAdd(e) {
		e.preventDefault();
		createAction(todoAction, 'add', { task: { text: input, key: Date.now() } });
		setInput('');
	}

	function handleInput(e) {
		setInput(e.target.value);
	}
	function handleDelete(index) {
		createAction(todoAction, 'remove', { index });
	}

	return (
		<div className="p-4 styled-scrollbar">
			<div className="text-center mb-2">
				<Form layout="inline" onSubmit={handleAdd}>
					<Form.Item>
						<Input
							suffix={<Icon type="form" />}
							placeholder="Task"
							value={input}
							onChange={handleInput}
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" disabled={!input}>
							Add
						</Button>
					</Form.Item>
				</Form>
			</div>
			<List size="small" bordered className="bg-light" loading={loading}>
				{!isEmpty(transitions) &&
					transitions.map(({ item, key, props }, index) => (
						<ListItem
							className="d-flex justify-content-between"
							key={key}
							style={props}
						>
							{item.text}{' '}
							<Icon
								type="delete"
								style={{
									cursor: 'pointer'
								}}
								onClick={() => handleDelete(index)}
							/>
						</ListItem>
					))}
			</List>
		</div>
	);
};

export default TodoList;

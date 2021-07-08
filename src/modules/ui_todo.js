import '../style/todoItem.css';
// import { todoList as listTodo } from './todos';

const ui = (function() {
	const domBody = document.querySelector('.content');
	let _todoList;

	function glueBackend(todoList) {
		_todoList = todoList;
	}

	function glueUiBody(body) {
		domBody = body;
	}

	function displayTodoList(list) {
		let domList = document.createElement('ul');
		domList.classList.add('todo-list');
		list.forEach((todoData) => {
			domList.append(createTodo(todoData));
		});
		domBody.append(domList);
	}

	function createTodo(todoData) {
		let domTodoItem = document.createElement('li');
		domTodoItem.classList.add('todo-item');

		let domTodoContent = document.createElement('div');
		let domBtnTodoStatus = document.createElement('button');
		let domBtnRemoveTodo = document.createElement('button');
		let domBtnEditTodo = document.createElement('button');

		domTodoContent.classList.add('todo-item-content');
		domTodoContent.innerHTML = todoHtml(todoData);

		domBtnTodoStatus.classList.add('todo-item-status');

		domTodoItem.append(domBtnTodoStatus);
		domTodoItem.append(domTodoContent);
		domTodoItem.append(domBtnRemoveTodo);
		domTodoItem.append(domBtnEditTodo);

		domBtnTodoStatus.addEventListener('click', (e) => handleStatusClicked(e, todoData));
		domBtnTodoStatus.textContent = todoData.completed ? 'finished' : 'unfinished';

		domBtnRemoveTodo.addEventListener('click', (e) => removeTodo(e, todoData));
		domBtnRemoveTodo.textContent = 'Remove';

		domBtnEditTodo.addEventListener('click', (e) => handleEditClicked(e, todoData));
		domBtnEditTodo.textContent = 'Edit';

		return domTodoItem;
	}

	function todoHtml(todoData) {
		let status = 'unfinished';
		if (todoData.completed === true) {
			status = 'finished';
		}
		return `
			<span class='todo-title todo-status-${status}'>${todoData.title}</span> 
			<span class='todo-description todo-status-${status}'>${todoData.description}</span>
			<span class='todo-priority todo-status-${status}'>priority: ${todoData.priority}</span>
			<span class='todo-due-date todo-status-${status}'>due-date: ${todoData.dueDate}</span>
		`;
	}

	function handleStatusClicked(e, todoData) {
		console.log('status clicked');
	}

	function removeTodo(event, todoData) {
		let parent = event.target.parentNode.parentNode;
		parent.removeChild(event.target.parentNode);
		_todoList.deleteTodo(todoData.index);
	}

	function handleEditClicked(event, todoData) {
		editTodo(event, todoData);
	}

	function editTodo(event, todoData) {
		_todoList.updateTodo(todoData.index, {title: 'Eat rice', priority: 'low', description:'dal-bhat'});
		let domTodoContent = event.target.parentNode.querySelector('.todo-item-content');
		domTodoContent.innerHTML = todoHtml(_todoList.getTodoItem(todoData.index));
	}

	return { displayTodoList, glueBackend, glueUiBody };
})();

export { ui };
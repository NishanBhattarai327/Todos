// import { todoList as listTodo } from './todos';

const ui = (function() {
	const domBody = document.querySelector('.content');
	let _todoList;

	function createTodoList(list) {
		let domList = document.createElement('ul');
		domList.classList.add('todo-list');
		list.forEach((todo) => {
			domList.appendChild(createTodo(todo));
		});
		domBody.appendChild(domList);
	}

	function createTodo(todoInput) {
		let domTodoItem = document.createElement('li');
		domTodoItem.classList.add('todo-item');

		let domBtnRemoveTodo = document.createElement('button');
		domTodoItem.innerHTML = `
			<div class='todo-item-content'>
				<span class='todo-title'>${todoInput.title}</span> 
				<span class='todo-description'>${todoInput.description}</span>
				priority: ${todoInput.priority} 
				due-date: ${todoInput.dueDate} 
				notes: ${todoInput.notes} 
				checklist: ${todoInput.checklist}
			</div>
		`;
		domTodoItem.appendChild(domBtnRemoveTodo);
		domBtnRemoveTodo.addEventListener('click', (e) => removeTodo(e, todoInput));
		domBtnRemoveTodo.textContent = 'Remove';

		return domTodoItem;
	}

	function removeTodo(event, todoInput) {
		let parent = event.target.parentNode.parentNode;
		parent.removeChild(event.target.parentNode);
		_todoList.deleteTodo(todoInput.index);
		// console.log(listTodo.getTodoList());
	}

	function glueBackend(todoList) {
		_todoList = todoList;
	}

	return { createTodoList, glueBackend };
})();

export { ui };
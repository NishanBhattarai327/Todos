import '../style/todoItem.css';
// import { todoList as listTodo } from './todos';

const ui = (function() {
	const domBody = document.querySelector('.content');
	let PubSub;

	function gluePubSub(pubSub) {
		PubSub = pubSub;
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

		domBtnTodoStatus.textContent = todoData.completed ? 'finished' : 'unfinished';
		domBtnTodoStatus.addEventListener('click', (e) => handleStatusClicked(e.target, todoData));

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
			<span class='todo-title status-${status}'>${todoData.title}</span> 
			<span class='todo-description status-${status}'>${todoData.description}</span>
			<span class='todo-priority status-${status}'>priority: ${todoData.priority}</span>
			<span class='todo-due-date status-${status}'>due-date: ${todoData.dueDate}</span>
		`;
	}

	function createForm(parent, data) {
		const form = document.createElement('form');
		form.classList.add('todo-edit-form');
		form.innerHTML = `
			<label for='title'>Title</label>
			<input type='text' name='title' id='title' class='field title' value='${data.title}'> <br>

			<label for='description'>Description</label>
			<textarea name='description' id='description' class='field description' rows="4" cols="50">${data.description}</textarea>
			<br>

			<label for='due-date'>Due Date</label>
			<input type='date' name='due-date' id='due-date' class='field due-date' value='${data.dueDate}'> <br>

			<label for='priority'>Priority</label>
			<select name="priority" id='priority' class='field priority'>
			    <option value="high">high</option>
			    <option value="midium">Medium</option>
			    <option value="low">low</option>
			</select>
			<br>

			<input type='submit' value='Add Todo' class='btn submit'>
		`;

		let popup = popupWindow(parent);
		popup.querySelector('.pop-up-content').append(form);

		const btnCancel = document.createElement('button');
		btnCancel.textContent = 'cancel';
		btnCancel.classList.add('btn', 'cancel');
		btnCancel.addEventListener('click', (e) => {
			e.preventDefault();
			removePopup(parent, popup)
		});

		form.append(btnCancel);

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			console.log('form submited');
		});
	}

	function popupWindow(parent) {
		const popup = document.createElement('div');
		popup.classList.add('pop-up-window');

		const content = document.createElement('div');
		content.classList.add('pop-up-content');

		const closePopup = document.createElement('span');
		closePopup.classList.add('pop-up-content-close');
		closePopup.innerHTML = '&times;';
		content.append(closePopup);

		popup.append(content);
		parent.append(popup);

		// When the user clicks on <span> (x), close popup
		closePopup.addEventListener('click', (e) => {
			removePopup(parent, popup);
		});
		// When the user clicks anywhere outside of the popup, close it
		window.addEventListener('click', (event) => {
		  if (event.target == popup) {
		    removePopup(parent, popup);
		  }
		});

		return popup;
	}

	function removePopup(parent, popup) {
		parent.removeChild(popup);
	}	

	function redrawTodo(parent, dataId){
		let data = PubSub.emit(PubSub.eventCODE.GET_TODO_ITEM, dataId);
		parent.querySelector('.todo-item-content').innerHTML = todoHtml(data);
	}

	function handleStatusClicked(btn, todoData) {
		btn.textContent = btn.textContent === 'finished' ? 'unfinished' : 'finished';
		let completed = btn.textContent === 'finished' ? true : false;

		PubSub.emit(PubSub.eventCODE.UPDATE_TODO, todoData.id, {completed});
		redrawTodo(btn.parentNode, todoData.id);
	}

	function removeTodo(event, todoData) {
		let parent = event.target.parentNode.parentNode;
		parent.removeChild(event.target.parentNode);
		PubSub.emit(PubSub.eventCODE.DELETE_TODO, todoData.id);
	}

	function handleEditClicked(event, todoData) {
		createForm(domBody, todoData);
		editTodo(event.target.parentNode, todoData);
	}

	function editTodo(parentNode, todoData) {
		PubSub.emit(
			PubSub.eventCODE.UPDATE_TODO, 
			todoData.id, 
			{title: 'Eat rice', priority: 'low', description:'dal-bhat'}
		);
		redrawTodo(parentNode, todoData.id);
	}


	return { displayTodoList, gluePubSub, glueUiBody };
})();

export { ui };
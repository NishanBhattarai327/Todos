import '../style/todoItem.css';

const ui = (function() {
	const domBody = document.querySelector('.content');
	let PubSub;

	function gluePubSub(pubSub) {
		PubSub = pubSub;
	}

	function glueUiBody(body) {
		domBody = body;
	}

	function render() {
		clearDisplay();

		let list = PubSub.emit(PubSub.eventCODE.GET_TODO_LIST);

		let domTodos = document.createElement('div');
		domTodos.classList.add('todos');
		
		let domList = document.createElement('ul');
		domList.classList.add('todo-list');
		list.forEach((todoData) => {
			domList.append(createTodo(todoData));
		});

		let domAddBtn = document.createElement('button');
		domAddBtn.textContent = 'Add Todo';
		domAddBtn.addEventListener('click', () => addTodo());

		domTodos.append(domList);
		domTodos.append(domAddBtn);
		domBody.append(domTodos);
	}

	function clearDisplay() {
		let display = document.querySelector('.todos');
		if(display) {
			domBody.removeChild(display);
		}
	}

	function createTodo(todoData) {
		let domTodoItem = document.createElement('li');
		domTodoItem.classList.add('todo-item');

		let domBtnTodoStatus = document.createElement('button');
		let domBtnRemoveTodo = document.createElement('button');
		let domBtnEditTodo = document.createElement('button');

		domBtnTodoStatus.classList.add('todo-btn', 'todo-status-btn');
		domBtnRemoveTodo.classList.add('todo-btn', 'todo-remove-btn');
		domBtnEditTodo.classList.add('todo-btn', 'todo-edit-btn');

		domBtnTodoStatus.textContent = todoData.completed ? '✖' : '✔';
		domBtnRemoveTodo.textContent = 'Delete';
		domBtnEditTodo.textContent = 'Edit';

		domBtnTodoStatus.addEventListener('click', (e) => handleStatusClicked(e.target, todoData));
		domBtnRemoveTodo.addEventListener('click', (e) => removeTodo(e, todoData));
		domBtnEditTodo.addEventListener('click', (e) => handleEditClicked(e, todoData));

		let domTodoContent = document.createElement('div');
		domTodoContent.setAttribute('id', `id-${todoData.id}`);
		domTodoContent.classList.add('todo-item-content');
		domTodoContent.innerHTML = todoHtml(todoData);

		domTodoItem.append(domBtnTodoStatus);
		domTodoItem.append(domTodoContent);
		domTodoItem.append(domBtnRemoveTodo);
		domTodoItem.append(domBtnEditTodo);

		btnState(domBtnTodoStatus, todoData.completed);
		
		return domTodoItem;
	}

	function todoHtml(todoData) {
		let status = 'unfinished';
		if (todoData.completed === true) {
			status = 'finished';
		}
		return `
			<span class='todo-title status-${status}-text'>${todoData.title}</span> 
			<span class='todo-description status-${status}-text'>${todoData.description}</span>
			<span class='todo-priority status-${status}-text'>priority: ${todoData.priority}</span>
			<span class='todo-due-date status-${status}-text'>due-date: ${todoData.dueDate}</span>
		`;
	}

	function addTodo() {
		PubSub.emit(PubSub.eventCODE.ADD_TODO, { title:'hello', description: 'you are nice'});
		render();
	}

	function createForm(parent, data, type='Add Todo') {
		const form = document.createElement('form');
		form.classList.add('todo-edit-form');
		form.innerHTML = `
			<label for='title'>Title</label>
			<input type='text' name='title' id='title' class='field title' value='${data.title}'> <br>

			<label for='description'>Description</label>
			<textarea name='description' id='description' class='field description' rows="4" cols="50">${data.description}</textarea>
			<br>

			<label for='due-date'>Due Date</label>
			<input type='date' name='dueDate' id='due-date' class='field due-date' value='${data.dueDate}'> <br>

			<label for='priority'>Priority</label>
			<select name="priority" id='priority' class='field priority'>
			    <option value="high">high</option>
			    <option value="medium">medium</option>
			    <option value="low">low</option>
			</select>
			<br>

			<input type='submit' value='${type}' class='btn submit'>
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
			formSubmit(data.id, e.target);
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
		    removePopup(parent);
		  }
		});

		return popup;
	}

	function formSubmit(todoId, form) {
		let title = form.title.value;
		let description = form.description.value;
		let dueDate = form.dueDate.value;
		let priority = form.priority.value;

		updateTodo(todoId, {title, description, dueDate, priority});
		removePopup();
	}

	function removePopup(parent=domBody) {
		parent.removeChild(document.querySelector('.pop-up-window'));
	}	


	function handleStatusClicked(btn, todoData) {
		btn.textContent = btn.textContent === '✖' ? '✔' : '✖';
		let completed = btn.textContent === '✖' ? true : false;
		btnState(btn, completed);

		PubSub.emit(PubSub.eventCODE.UPDATE_TODO, todoData.id, {completed});
		redrawTodo(todoData.id);
	}

	function btnState(btn, boolean) {
		if(boolean) {
			btn.parentNode.classList.add('status-finished');
			btn.classList.add('todo-status-completed-btn');
		}
		else {
			btn.parentNode.classList.remove('status-finished');
			btn.classList.remove('todo-status-completed-btn');
		}
	}

	function removeTodo(event, todoData) {
		let parent = event.target.parentNode.parentNode;
		parent.removeChild(event.target.parentNode);
		PubSub.emit(PubSub.eventCODE.DELETE_TODO, todoData.id);
	}

	function handleEditClicked(event, todoData) {
		createForm(domBody, todoData, 'Edit');
	}

	function updateTodo(id, newData) {
		PubSub.emit(
			PubSub.eventCODE.UPDATE_TODO, id, newData
		);
		redrawTodo(id);
	}

	function redrawTodo(dataId){
		let data = PubSub.emit(PubSub.eventCODE.GET_TODO_ITEM, dataId);
		document.querySelector(`#id-${dataId}`).innerHTML = todoHtml(data);
	}

	return { render, gluePubSub, glueUiBody };
})();

export { ui };
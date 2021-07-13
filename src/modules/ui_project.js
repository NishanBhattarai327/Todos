import '../style/project.css';

const ui = (function() {
	let domBody = document.querySelector('.content');
	let PubSub;

	function gluePubSub(pubSub) {
		PubSub = pubSub;
	}

	function glueUiBody(body) {
		domBody = body;
	}

	function render() {
		clearDisplay();

		let list = PubSub.emit(PubSub.eventCODE.GET_PROJECT_LIST);
		let focusedProject = PubSub.emit(PubSub.eventCODE.GET_FOCUSED_PROJECT);

		let domProjects = document.createElement('div');
		domProjects.classList.add('projects');
		
		let domList = document.createElement('ul');
		domList.classList.add('project-list');
		list.forEach((data) => {
			let projectView = createProject(data);
			if(data.id === focusedProject) {
				projectView.classList.add('focused-project');
			}
			domList.append(projectView);
		});

		let domAddBtn = document.createElement('button');
		domAddBtn.classList.add('add-btn', 'btn');
		domAddBtn.textContent = '+';
		domAddBtn.addEventListener('click', (e) => handleAddClicked(e.target));

		domProjects.append(domList);
		domProjects.append(domAddBtn);
		domBody.append(domProjects);
	}

	function clearDisplay() {
		let display = document.querySelector('.projects');
		if(display) {
			domBody.removeChild(display);
		}
	}

	function createProject(data) {
		let domProject = document.createElement('li');
		domProject.classList.add('project');
		domProject.addEventListener('click', (e) => handleFocusedProject(e.target, data));

		let removeBtn = document.createElement('button');
		let editBtn = document.createElement('button');
		let domInfo = document.createElement('span');
		domInfo.classList.add('project-info');
		domInfo.innerHTML = data.title;

		removeBtn.classList.add('btn', 'remove-btn', 'left');
		editBtn.classList.add('btn', 'edit-btn');

		removeBtn.textContent = 'Del';
		editBtn.textContent = 'Edit';

		removeBtn.addEventListener('click', (e) => handleRemoveClicked(e.target, data.id));
		editBtn.addEventListener('click', (e) => handleEditClicked(e.target, data));

		domProject.append(domInfo);
		domProject.append(removeBtn);
		domProject.append(editBtn);

		return domProject;
	}

	function createForm(parent, data, type='Add Project') {
		const form = document.createElement('form');
		form.classList.add('form');
		form.innerHTML = `
			<label for='title'>Title</label>
			<input type='text' name='title' id='title' class='field title' value='${data.title|| ''}'><br>
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
			formSubmit(e.target, data.id);
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

	function removePopup(parent=domBody) {
		parent.removeChild(document.querySelector('.pop-up-window'));
	}

	function formSubmit(form, projectId) {
		let title = form.title.value || 'Untitled';

		if(projectId === undefined) {
			addProject({title});
		} else {
			updateProject(projectId, {title});
		}

		removePopup();
	}

	function handleFocusedProject(btn, data) {
		PubSub.emit(PubSub.eventCODE.CHANGE_FOCUS_TO_PROJECT_OF_ID, data.id);
		render();
	}

	function handleAddClicked(btn) {
		createForm(domBody, {});
		render();
	}

	function handleEditClicked(btn, projectData) {
		createForm(domBody, projectData, 'Edit');
	}

	function handleRemoveClicked(btn, id) {
		PubSub.emit(PubSub.eventCODE.DELETE_PROJECT, id);
		render();
	}

	function addProject(data) {
		PubSub.emit(
			PubSub.eventCODE.ADD_PROJECT, data
		);
		render();
	}

	function updateProject(id, newData) {
		PubSub.emit(
			PubSub.eventCODE.UPDATE_PROJECT, id, newData
		);
		render();
	}

	return { render, gluePubSub, glueUiBody };
})();

export { ui };
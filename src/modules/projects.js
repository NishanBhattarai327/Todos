const projects = (function() {
	let list = [];
	let focusedProjectId = 0;
	let PubSub;

	function gluePubSub(pubSub) {
		PubSub = pubSub;
	}

	function getFocusedProject() {
		let todoList = list[getIndex(focusedProjectId)].todoList;
		PubSub.emit(PubSub.eventCODE.SET_TODO_LIST, todoList);
		return focusedProjectId;
	}

	function changeFocusToProjectOfId(id) {
		focusedProjectId = id;
	}

	function getTodoList(id=focusedProjectId) {
		let index = getIndex(id);
		if(list[index].todoList) {
			return list[index].todoList;
		}
		return ;
	}

	function addTodoList(todoList, id) {
		let index = getIndex(id);
		list[index] = Object.assign(list[index], { todoList });
	}

	function getProjectList() {
		return list;
	}

	function getProject(id=focusedProjectId) {
		return list[getIndex(id)];
	}

	function addProject(input) {
		let title = input.title || 'Untitled', focus = input.focus || false;
		let id = list.length;
		list.push({title, focus, id});
	}

	function updateProject(id, input) {
		let index = getIndex(id);
		list[index] = Object.assign(list[index], input);
	}

	function deleteProject(id) {
		return list.splice(getIndex(id), 1).length !== 0 ? true : false;
	}


	function getIndex(id) {
		let index;
		list.filter((project, i) => {
			if (project.id === id) index = i;
		});
		return index;
	}


	return { 
		gluePubSub,
		getProjectList, getProject, addProject, updateProject, deleteProject, 
		getTodoList, addTodoList,
		getFocusedProject, changeFocusToProjectOfId
	};
})();

export { projects };
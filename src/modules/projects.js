/**
 * This module handles and manupulates projects data
 * */

const projects = (function() {
	let list = []; /*Project list*/
	let focusedProjectId = 0; /*Id of the project that is clicked*/
	let PubSub; /*Mediator module*/

	function gluePubSub(pubSub) {
		PubSub = pubSub;
	}

	function getFocusedProject() {
		if (focusedProjectId !== undefined) {
			let index = getIndex(focusedProjectId);
			let todoList = list[index].todoList || [];
			PubSub.emit(PubSub.eventCODE.SET_TODO_LIST, todoList);
			return focusedProjectId;
		}
	}

	function changeFocusToProjectOfId(id) {
		let todoList = PubSub.emit(PubSub.eventCODE.GET_TODO_LIST);
		addTodoList(todoList, focusedProjectId);
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
		let previousList = list[index] || {};
		list[index] = Object.assign(previousList, { todoList });
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
		let index = getIndex(id);
		list.splice(index, 1);

		//if focused project is deleted the
		if (id === focusedProjectId) {
			//set focus to the first list element;
			focusedProjectId = list[0] ? list[0].id : undefined;
		}
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
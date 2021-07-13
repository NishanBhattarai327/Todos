const projects = (function() {
	let list = [];

	function getTodoList(id) {
		let index = getIndex(id);
		return list[index].todoList;
	}

	function addTodoList(id, todoList) {
		let index = getIndex(id);
		list[index] = Object.assign(list[index], { todoList });
	}

	function getProjectList() {
		return list;
	}

	function getProject(id=0) {
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


	return { getProjectList, getProject, addProject, updateProject, deleteProject, getTodoList, addTodoList };
})();

export { projects };
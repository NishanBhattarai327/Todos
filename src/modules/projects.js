const projects = (function() {
	let projectList = [];

	function getTodoList(id) {
		let index = getIndex(id);
		return projectList[index].todoList;
	}

	function addTodoList(id, todoList) {
		let index = getIndex(id);
		projectList[index] = Object.assign(projectList[index], { todoList });
	}

	function getProjectList() {
		return projectList;
	}

	function getProject(id=0) {
		return projectList[getIndex(id)];
	}

	function addProject(input) {
		let title = input.title || 'Untitled', focus = input.focus || false;
		let id = projectList.length;
		projectList.push({title, focus, id});
	}

	function updateProject(id, input) {
		let index = getIndex(id);
		projectList[index] = Object.assign(list[index], input);
	}

	function deleteProject(id) {
		return projectList.splice(getIndex(id), 1).length !== 0 ? true : false;
	}


	function getIndex(id) {
		let index;
		projectList.filter((project, i) => {
			if (project.id === id) index = i;
		});
		return index;
	}


	return { getProjectList, getProject, addProject, updateProject, deleteProject, getTodoList, addTodoList };
})();

export { projects };
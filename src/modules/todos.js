const todos = (function() {
	let list = [];

	function getTodoList() {
		return list;
	}

	function setTodoList(newList) {
		list = newList;
	}

	function getTodoItem(id) {
		return list[getIndex(id)];
	}

	function addTodo(input) {
		let title = input.title, description = input.description || '',
			dueDate = input.dueDate, priority = input.priority, 
			completed = input.completed || false;
		let id = list.length;

		list.push({title, description, dueDate, priority, completed, id});
	}

	function deleteTodo(id) {
		return list.splice(getIndex(id), 1).length !== 0 ? true : false;
	}

	function updateTodo(id, input) {
		let index = getIndex(id);
		list[index] = Object.assign(list[index], input);
	}

	function getIndex(id) {
		let index;
		list.filter((todo, i) => {
			if (todo.id === id) index = i;
		});
		return index;
	}

	return { getTodoList, setTodoList, getTodoItem, addTodo, deleteTodo, updateTodo };

})();

export { todos };
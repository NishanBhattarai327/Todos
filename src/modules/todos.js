const todoList = (function() {
	let list = [];

	function getTodoList() {
		return list;
	}

	function getTodoItem(index) {
		return list[index];
	}

	function addTodo(input) {
		let title = input.title, description = input.description || '',
			dueDate = input.dueDate, priority = input.priority, 
			completed = input.completed || false;

		let index = list.length;

		list.push({title, description, dueDate, priority, completed, index});
	}

	function deleteTodo(index) {
		let todoIndex;
		list.filter((todo, i) => {
			if (todo.index === index) todoIndex = i;
			// console.log({todo, i});
		});

		return list.splice(todoIndex, 1).length !== 0 ? true : false;
	}

	function updateTodo(index, input) {
		list[index] = Object.assign(list[index], input);
	}

	return { getTodoList, getTodoItem, addTodo, deleteTodo, updateTodo, };

})();

export { todoList };
const ui = (function() {
	const domBody = document.querySelector('.content');

	function createTodoList(list) {
		let domList = document.createElement('ul');
		list.forEach((todo) => {
			domList.appendChild(createTodo(todo));
		});
		domBody.appendChild(domList);
	}

	function createTodo(input) {
		let domTodoItem = document.createElement('li');
		domTodoItem.innerHTML = `
			<span class='todo-title'>${input.title}</span> 
			<span class='todo-description'>${input.description}</span>
			priority: ${input.priority} 
			due-date: ${input.dueDate} 
			notes: ${input.notes} 
			checklist: ${input.checklist}
		`;
		return domTodoItem;
	}

	return { createTodoList };
})();

console.log('hi');

export { ui };
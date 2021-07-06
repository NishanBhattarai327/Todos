const todos = (function() {
	return 'hi';
})();

const createTodos = function(title, description, dueDate, priority, notes='', checklist='') {
	return {
		title, description, dueDate, priority, notes, checklist,
	}
};

const createProjects = function(name, description) {

}

export { todos };
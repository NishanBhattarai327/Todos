const PubSub = (() => {
	let events = {};

	const GET_PROJECT_LIST = 'get-projects-list';
	const ADD_PROJECT = 'add-project-to-projects-list';
	const UPDATE_PROJECT = 'update-project-of-projects-list';
	const DELETE_PROJECT = 'delete-project-of-projects-list';
	const GET_PROJECT = 'get-project-form-list-with-id';
	const GET_FOCUSED_PROJECT = 'get-focused-project-from-list';
	const CHANGE_FOCUS_TO_PROJECT_OF_ID = 'change-focus-to-project-of-id';

	const GET_TODO_LIST = 'get-todo-list';
	const SET_TODO_LIST = 'set-todo-list';
	const ADD_TODO = 'add-todo-to-todo-list';
	const UPDATE_TODO = 'update-todo-item-of-list';
	const DELETE_TODO = 'delete-todo-item-of-list';
	const GET_TODO_ITEM = 'get-todo-item-from-list-with-id';

	const GET_TODOS_PARENT_DOM = 'get the dom for todo body';

	const RENDERED_TODOS = 'redered todos';

	let eventCODE = { 
		GET_PROJECT_LIST, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, GET_PROJECT, 
		GET_FOCUSED_PROJECT, CHANGE_FOCUS_TO_PROJECT_OF_ID,
		GET_TODO_LIST, SET_TODO_LIST, ADD_TODO, UPDATE_TODO, DELETE_TODO, GET_TODO_ITEM,
		GET_TODOS_PARENT_DOM, 
		RENDERED_TODOS
	};

	function subscribe(eventName, callback) {
		if(!events.hasOwnProperty(eventName)){
			events[eventName] = [];
			events[eventName].push(callback);
		}
		else {
			events[eventName].push(callback);
		}
	}

	function unsubscribe(eventName, callback) {
		let index = events[eventName].indexOf(callback);
		events[eventName].splice(index, 1);
	}

	function emit(eventName, ...args) {
		let returnValue;
		if(events[eventName] !== undefined){
			events[eventName].forEach((callback) => {
				if(args.length === 0) { returnValue = callback(); }
				returnValue = callback(...args);
			});
		}
		return returnValue;
	}

	return { subscribe, unsubscribe, emit, eventCODE };
})();

export { PubSub };
const PubSub = (() => {
	let events = {};

	const GET_PROJECT_LIST = 'get-projects-list';
	const ADD_PROJECT = 'add-project-to-projects-list';
	const UPDATE_PROJECT = 'update-project-of-projects-list';
	const DELETE_PROJECT = 'delete-project-of-projects-list';
	const GET_PROJECT_ITEM = 'get-project-form-list-with-id';
	const GET_TODO_LIST = 'get-todo-list';
	const ADD_TODO = 'add-todo-to-todo-list';
	const UPDATE_TODO = 'update-todo-item-of-list';
	const DELETE_TODO = 'delete-todo-item-of-list';
	const GET_TODO_ITEM = 'get-todo-item-from-list-with-id';


	let eventCODE = { 
		GET_PROJECT_LIST, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, GET_PROJECT_ITEM,
		GET_TODO_LIST,    ADD_TODO,    UPDATE_TODO,    DELETE_TODO,    GET_TODO_ITEM
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
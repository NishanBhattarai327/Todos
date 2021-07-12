const PubSub = (() => {
	let events = {};

	const GET_TODO_LIST = 'get-todo-list';
	const UPDATE_TODO = 'update-todo-item-of-list';
	const DELETE_TODO = 'delete-todo-item-of-list';
	const GET_TODO_ITEM = 'get-todo-item-of-list-of-id';
	const ADD_TODO = 'add-todo-to-list';

	let eventCODE = { GET_TODO_LIST, UPDATE_TODO, DELETE_TODO, GET_TODO_ITEM, ADD_TODO};

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
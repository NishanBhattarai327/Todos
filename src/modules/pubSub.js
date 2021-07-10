const PubSub = (() => {
	let events = {};

	const UPDATE_TODO = 'update-todo-item-of-list';
	const DELETE_TODO = 'delete-todo-item-of-list';
	const GET_TODO_ITEM = 'get-todo-item-of-list-of-id';

	let eventCODE = { UPDATE_TODO, DELETE_TODO, GET_TODO_ITEM };

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

	function emit(eventName, ...info) {
		let returnValue;
		if(events[eventName] !== undefined){
			events[eventName].forEach((callback) => {
				returnValue = callback(...info);
			});
		}
		return returnValue;
	}

	return { subscribe, unsubscribe, emit, eventCODE };
})();

export { PubSub };
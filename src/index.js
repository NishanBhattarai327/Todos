import './style.css';
import { todoList } from './modules/todos.js';

todoList.addTodo({title: 'Washing Cloth', description: 'school dress', 
	dueDate: '2077/04/03', priority: 'high'});
todoList.addTodo({title: 'Washing Cloth', description: 'school dress', 
	dueDate: '2077/04/03', priority: 'high'});
todoList.addTodo({title: 'Washing Cloth', description: 'school dress', 
	dueDate: '2077/04/03', priority: 'high'});

todoList.updateTodo(1, {title: 'Wash tie'});
todoList.deleteTodo(2);
console.log(todoList.getTodoList());




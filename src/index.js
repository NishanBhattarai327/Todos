import './style/style.css';
import { todoList } from './modules/todos.js';
import { ui as ui_todo } from './modules/ui_todo.js';

todoList.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2077/04/03', priority: 'high'});
todoList.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2077/04/03', priority: 'high'});
todoList.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2077/04/03', priority: 'high'});

todoList.updateTodo(1, {title: 'Wash tie'});
todoList.deleteTodo(2);

ui_todo.glueBackend(todoList);
ui_todo.displayTodoList(todoList.getTodoList());




import './style/style.css';
import { PubSub } from './modules/pubSub.js';
import { todoList } from './modules/todos.js';
import { ui as ui_todo } from './modules/ui_todo.js';

PubSub.subscribe(PubSub.eventCODE.UPDATE_TODO, todoList.updateTodo);
PubSub.subscribe(PubSub.eventCODE.DELETE_TODO, todoList.deleteTodo);
PubSub.subscribe(PubSub.eventCODE.GET_TODO_ITEM, todoList.getTodoItem);

todoList.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
todoList.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
todoList.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});

todoList.updateTodo(1, {title: 'Wash tie'});
todoList.deleteTodo(2);

ui_todo.gluePubSub(PubSub);
ui_todo.displayTodoList(todoList.getTodoList());




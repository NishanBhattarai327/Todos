import './style/style.css';
import { PubSub } from './modules/pubSub.js';
import { todos, newTodos } from './modules/todos.js';
import { projects } from './modules/projects.js';
import { ui as ui_todo } from './modules/ui_todo.js';

let today = newTodos();

today.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
today.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
today.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});

projects.addProject({title:'Basic'});
projects.addTodoList(0, today);
console.log(projects.getProjectList());
console.log(projects.getProject(0));

let current = projects.getProject().todoList;
PubSub.subscribe(PubSub.eventCODE.GET_TODO_LIST, current.getTodoList);
PubSub.subscribe(PubSub.eventCODE.GET_TODO_ITEM, current.getTodoItem);
PubSub.subscribe(PubSub.eventCODE.ADD_TODO, current.addTodo);
PubSub.subscribe(PubSub.eventCODE.UPDATE_TODO, current.updateTodo);
PubSub.subscribe(PubSub.eventCODE.DELETE_TODO, current.deleteTodo);

ui_todo.gluePubSub(PubSub);
ui_todo.render();

function currentProject() {

}



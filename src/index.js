import './style/style.css';
import { PubSub } from './modules/pubSub.js';
import { todos, newTodos } from './modules/todos.js';
import { projects } from './modules/projects.js';
import { ui as ui_todo } from './modules/ui_todo.js';
import { ui as ui_project } from './modules/ui_project.js';

let today = newTodos();

today.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
today.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
today.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});

projects.addProject({title:'Basic 0'});
projects.addProject({title:'Basic 1'});
projects.addProject({title:'Basic 2'});
projects.addProject({title:'Basic 3'});
projects.addTodoList(0, today);
// console.log(projects.getProjectList());
// console.log(projects.getProject(0));

let current = projects.getProject().todoList;

PubSub.subscribe(PubSub.eventCODE.GET_PROJECT_LIST, projects.getProjectList);
PubSub.subscribe(PubSub.eventCODE.ADD_PROJECT, projects.addProject);
PubSub.subscribe(PubSub.eventCODE.UPDATE_PROJECT, projects.updateProject);
PubSub.subscribe(PubSub.eventCODE.DELETE_PROJECT, projects.deleteProject);
PubSub.subscribe(PubSub.eventCODE.GET_FOCUSED_PROJECT, projects.getFocusedProject);
PubSub.subscribe(PubSub.eventCODE.CHANGE_FOCUS_TO_PROJECT_OF_ID, projects.changeFocusToProjectOfId);

PubSub.subscribe(PubSub.eventCODE.GET_TODO_LIST, current.getTodoList);
PubSub.subscribe(PubSub.eventCODE.ADD_TODO, current.addTodo);
PubSub.subscribe(PubSub.eventCODE.UPDATE_TODO, current.updateTodo);
PubSub.subscribe(PubSub.eventCODE.DELETE_TODO, current.deleteTodo);

// ui_todo.gluePubSub(PubSub);
// ui_todo.render();

ui_project.gluePubSub(PubSub);
ui_project.render();




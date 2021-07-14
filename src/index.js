import './style/style.css';
import { PubSub } from './modules/pubSub.js';
import { todos } from './modules/todos.js';
import { projects } from './modules/projects.js';
import { ui as ui_todo } from './modules/ui_todo.js';
import { ui as ui_project } from './modules/ui_project.js';

todos.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
todos.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});
todos.addTodo({title: 'Washing Cloth', description: 'school dress', dueDate: '2018-07-22', priority: 'high'});

projects.gluePubSub(PubSub);
projects.addProject({title:'Today'});
projects.addProject({title:'Basic 1'});
projects.addProject({title:'Basic 2'});
projects.addProject({title:'Basic 3'});
projects.addTodoList(todos.getTodoList(), 0);

ui_project.gluePubSub(PubSub);
ui_todo.gluePubSub(PubSub);

PubSub.subscribe(PubSub.eventCODE.GET_PROJECT_LIST,              projects.getProjectList);
PubSub.subscribe(PubSub.eventCODE.ADD_PROJECT,                   projects.addProject);
PubSub.subscribe(PubSub.eventCODE.UPDATE_PROJECT,                projects.updateProject);
PubSub.subscribe(PubSub.eventCODE.DELETE_PROJECT,                projects.deleteProject);
PubSub.subscribe(PubSub.eventCODE.GET_FOCUSED_PROJECT,           projects.getFocusedProject);
PubSub.subscribe(PubSub.eventCODE.CHANGE_FOCUS_TO_PROJECT_OF_ID, projects.changeFocusToProjectOfId);

PubSub.subscribe(PubSub.eventCODE.GET_TODO_LIST, todos.getTodoList);
PubSub.subscribe(PubSub.eventCODE.SET_TODO_LIST, todos.setTodoList);
PubSub.subscribe(PubSub.eventCODE.ADD_TODO,      todos.addTodo);
PubSub.subscribe(PubSub.eventCODE.UPDATE_TODO,   todos.updateTodo);
PubSub.subscribe(PubSub.eventCODE.DELETE_TODO,   todos.deleteTodo);

PubSub.subscribe(PubSub.eventCODE.GET_TODOS_PARENT_DOM, ui_project.getTodoBody);
PubSub.subscribe(PubSub.eventCODE.RENDERED_TODOS, ui_todo.render);

ui_project.render();






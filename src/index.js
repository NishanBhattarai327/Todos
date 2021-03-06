/**
 * This app has two data modules
 * one. projects.js for handling project list
 * two. todos.js for handling todo list
 *
 * project list contents information about the project and every project can have their own todo list
 * project list is manupulated using projects.js modules but for todo list of every project it uses
 * todos.js module; for that we pass the todo list of every project to todos.js module;
 * 
 * It have PubSub.js module which is mediator for communication between modules
 * 
 * It have two ui modules for handling UIs 
 * one. ui_todo.js for handling the view of todo data
 * two. ui_project.js for hanling the view of project data
 * 
 * 
 * **/


import './style/style.css';
import { PubSub } from './modules/pubSub.js';
import { todos } from './modules/todos.js';
import { projects } from './modules/projects.js';
import { ui as ui_todo } from './modules/ui_todo.js';
import { ui as ui_project } from './modules/ui_project.js';

projects.gluePubSub(PubSub);
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

/*Initial project and work todos*/
projects.addProject({title:'Daily'});
projects.addTodoList([
	todos.addTodo({title: 'Meditate', description: '30 min', dueDate: '2018-07-22', priority: 'high'}),
	todos.addTodo({title: 'Study', description: 'acadamic study', dueDate: '2018-07-22', priority: 'high'}),
	todos.addTodo({title: 'Evening Walk', description: '5 km', dueDate: '2018-07-22', priority: 'high'})
], 0);
/*set todos module todo list to empty list*/
todos.setTodoList([]);

projects.addProject({title:'Weekly'});
projects.addTodoList([
    todos.addTodo({title: 'Complete 50% of physic notes', dueDate: '2018-07-22', priority: 'high'}),
    todos.addTodo({title: 'Complete the todos project', dueDate: '2018-07-22', priority: 'high'}),
    todos.addTodo({title: 'Plant 10 trees', dueDate: '2018-07-22', priority: 'high'})
], 1);
/*set todos module todo list to empty list*/
todos.setTodoList([]);

projects.addProject({title:'Monthly'});
projects.addTodoList([
    todos.addTodo({title: '1000 mins of Meditation', description: 'daily 30 min', dueDate: '2018-07-22', priority: 'high'}),
    todos.addTodo({title: 'Complete physic and Chemistry notes', description: 'acadamic study', dueDate: '2018-07-22', priority: 'high'}),
    todos.addTodo({title: 'Plant 45 trees', description: 'weekly 10-12 trees', dueDate: '2018-07-22', priority: 'high'})
], 2);
/*set todos module todo list to empty list*/
todos.setTodoList([]);

projects.addProject({title:'Today work'});
projects.addTodoList([
    todos.addTodo({title: 'Cook rice', dueDate: '2018-07-22', priority: 'high'})
], 3);
/*set todos module todo list to empty list*/
todos.setTodoList([]);

ui_project.render();






import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import users, { fetchUsers } from './users';
import tasks, { fetchTasks, createTask, updateTask } from './tasks';

const reducer = combineReducers({
  tasks,
  users
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
export { fetchUsers, fetchTasks, updateTask, createTask };

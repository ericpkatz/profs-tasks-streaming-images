import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, fetchUsers } from './store';
import { Routes, Route, Link} from 'react-router-dom';
import Tasks from './Tasks';
import TaskCreate from './TaskCreate';
import TaskEdit from './TaskEdit';
import Users from './Users';

const App = ()=> {
  const { tasks, users } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchTasks());
    dispatch(fetchUsers());
  }, []);
  return (
    <div>
      <h1><Link to='/'>Tasks ({ tasks.length })</Link></h1>
      <nav>
        <Link to='/users'>Users ({ users.length })</Link>
        <Link to='/tasks/pending'>Pending Tasks</Link>
        <Link to='/tasks/create'>Create A Task</Link>
      </nav>
      <Routes>
        <Route path='/' element={ <Tasks /> } />
        <Route path='/users' element={ <Users /> } />
        <Route path='/tasks/create' element={ <TaskCreate /> } />
        <Route path='/tasks/pending' element={ <Tasks /> } />
        <Route path='/tasks/:id' element={ <TaskEdit /> } />
      </Routes>
    </div>
  );
};

export default App;

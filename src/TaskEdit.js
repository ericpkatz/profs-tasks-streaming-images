import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from './store';

const TaskEdit = ()=> {
  const { id } = useParams();
  const { tasks } = useSelector(state => state);
  const [name, setName] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [priority, setPriority] = useState(5);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=> {
    const task = tasks.find( task => task.id === id);
    if(task){
      setName(task.name);
      setIsComplete(task.isComplete);
      setPriority(task.priority);
    }
  }, [tasks]);

  const update = async(ev)=> {
    ev.preventDefault();
    await dispatch(updateTask({ name, id, isComplete, priority }));
    navigate('/');
  };

  const priorities = [];
  for(let i = 1; i <= 20; i++){
    priorities.push(i);
  }

  return (
    <form onSubmit={ update }>
      <input value={ name } onChange={ ev => setName(ev.target.value )}/>
      <input type='checkbox' checked={ isComplete } onChange={ev => setIsComplete(ev.target.checked)}/>
      <select value={ priority } onChange={ ev => setPriority(ev.target.value) }>
        {
          priorities.map( p => {
            return (
              <option key={ p }>{ p }</option>
            );
          })
        }
      </select>
      <button>Update</button>
    </form>
  );
};

export default TaskEdit;

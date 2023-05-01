import React, { useState, useRef, useEffect } from 'react';
import { createTask } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TaskCreate = ()=> {
  const [name, setName ] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [priority, setPriority] = useState(5);
  const [userId, setUserId] = useState('');
  const [image, setImage ] = useState('');
  const { users } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(()=> {
    ref.current.addEventListener('change', (ev)=> {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', ()=> {
        setImage(reader.result);
      });
    });
  }, [ref]);

  const create = async(ev)=> {
    ev.preventDefault();
    await dispatch(createTask({ name, isComplete, priority, userId, image }));
    navigate('/');
  };

  const priorities = [];
  for(let i = 1; i <= 20; i++){
    priorities.push(i);
  }
  return (
    <form onSubmit={ create }>
      <input value={ name } onChange={ ev => setName(ev.target.value)} placeholder='name of task'/>
      <label>
      IsComplete:
      <input type='checkbox' checked={ isComplete } onChange={ ev => setIsComplete(ev.target.checked)}/>
      </label>
      <select value={ priority } onChange={ ev => setPriority(ev.target.value) }>
        {
          priorities.map( p => {
            return (
              <option key={ p }>{ p }</option>
            );
          })
        }
      </select>
      <select value={ userId } onChange={ ev => setUserId(ev.target.value)}>
        <option value=''>Choose A User</option>
        {
          users.map( user => {
            return (
              <option value={ user.id } key={ user.id }>{ user.name }</option>
            );
          })
        }
      </select>
      <input type='file' ref={ ref }/>
      { !!image && <img src={ image } style={{ width: '100px'}} /> }
      <button disabled={ !userId }>Create</button>
    </form>
  );
};

export default TaskCreate;

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PendingTasks = ()=> {
  const { tasks } = useSelector(state => state);
  return (
    <ul>
      {
        tasks.filter(task => !task.isComplete).map( task => {
          return (
            <li key={ task.id }>
              <Link to={`/tasks/${task.id}`} style={{ textDecoration: task.isComplete ? 'line-through': ''}}>{ task.name }</Link>
              ({ task.priority })
            </li>
          );
        })
      }
    </ul>
  );
};

export default PendingTasks;

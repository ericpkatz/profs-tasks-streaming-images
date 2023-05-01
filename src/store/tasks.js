import axios from 'axios';

const tasks = (state = [], action)=> {
  if(action.type === 'SET_TASKS'){
    return action.tasks;
  }
  if(action.type === 'CREATE_TASK'){
    state = [...state, action.task];
    state.sort((a, b)=> {
      if(a.priority > b.priority){
        return 1;
      }
      return -1;
    });
  }
  if(action.type === 'UPDATE_TASK'){
    state = state.map(task => {
      if(task.id === action.task.id){
        return action.task;
      }
      return task;
    });
    state.sort((a, b)=> {
      if(a.priority > b.priority){
        return 1;
      }
      return -1;
    });
  }
  return state;
};

export const fetchTasks = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/tasks');
    dispatch({ type: 'SET_TASKS', tasks: response.data });
  };
};

export const createTask = (task)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/tasks', task);
    dispatch({ type: 'CREATE_TASK', task: response.data });
  };
};

export const updateTask = (task)=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    dispatch({ type: 'UPDATE_TASK', task: response.data });
  };
};

export default tasks;

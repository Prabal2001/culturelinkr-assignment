import React, { useState } from 'react';
import axios from 'axios';
import { BsCircleFill } from "react-icons/bs";
import '../App.css';

const Create = ({addTodo}) => {
    
    const[task,setTask] = useState();
    const handleChange = (e) => {
      e.preventDefault();
      setTask(e.target.value);
    }
    const handleAdd = () => {
      if(task.trim() === "") {
        alert('Task cannot be empty');
        return;
      }
        axios.post('http://localhost:8000/api/todos/add-todo',{task:task})
          .then(result => {
            addTodo(result.data); 
            setTask("");
          })
          .catch(err => console.log(err))
          
    }
  return (
    <div className='form'>
    <div className='create_form'>
     <input type='text' value={task} placeholder='Enter task' onChange={handleChange} />
     <button type='button' onClick={handleAdd}>Add</button>
    </div>
    </div>
  )
}

export default Create;
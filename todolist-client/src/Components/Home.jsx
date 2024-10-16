import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import {BsCircleFill,BsFillTrashFill,BsFillCheckCircleFill} from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import '../App.css';

const Home = () => {
    const[todos,setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});
    useEffect(() => {
      axios.get('http://localhost:8000/api/todos/get-todo')
             .then(result => setTodos(result.data))
             .catch(err => console.log(err))
    },[])
     
    const addTodo = (newTodo) => {
      setTodos([...todos, newTodo]); 
        };

  
     const handleEdit = (id) => {
      axios.put('http://localhost:8000/api/todos/mark-todo/' +id)
      .then(result => {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: !todo.completed } : todo));
      })
      .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
      axios.delete('http://localhost:8000/api/todos/delete-todo/'+id)
      .then(result => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err))
    }
    const handleEditClick = (todo) => {
      setIsEditing(true);
      setCurrentTodo(todo);
    };
   
    const handleUpdate = (id) => {
      axios
        .put(`http://localhost:8000/api/todos/update-todo/${id}`, { task: currentTodo.task })
        .then((result) => {
          
          setTodos(todos.map((todo) => (todo._id === id ? { ...todo, task: currentTodo.task } : todo)));
          setIsEditing(false);
          setCurrentTodo({}); 
        })
        .catch((err) => console.log(err));
    };
    const handleEditInputChange = (e) => {
      setCurrentTodo({ ...currentTodo, task: e.target.value });
    };
    
  
  return (
    <div className='container'>
    <h2 style={{textAlign:"center"}}>TodoList</h2>
    <Create addTodo={addTodo} />
    {
        todos.length === 0 ? 
        <div><h3>No Record Found</h3></div>
              :
              todos.map(todo => (
      <div className='task' key={todo._id}>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.completed ? <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                 : <BsCircleFill className='icon' />
                }
                    {isEditing && currentTodo._id === todo._id ? (
                            <input
                                type='text'
                                value={currentTodo.task}
                                onChange={handleEditInputChange}
                                className='edit-input'
                            />
                        ) : (
                            <p className={todo.completed ? "line_through" : ""}>{todo.task}</p>
                        )}
              </div>
                <div>
                {isEditing && currentTodo._id === todo._id ? (
                            <button onClick={() => handleUpdate(todo._id)} >
                                Update
                            </button>
                        ) : (
                            <FaEdit className='icon' onClick={() => handleEditClick(todo)} />
                        )}
                   <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
                </div>
                </div>
                ))
             }
             
    </div>
  )
}

export default Home;
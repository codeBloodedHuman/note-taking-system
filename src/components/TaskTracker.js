import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('https://notes-backend-system.onrender.com/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const addTask = () => {
    axios.post('https://notes-backend-system.onrender.com/tasks/add', { text: newTaskText })
      .then(() => {
        fetchTasks();
        setNewTaskText(''); 
      })
      .catch(err => console.error(err));
  };

  const updateTask = (id, updatedTask) => {
    
    const { text, completed, dueDate, priority } = updatedTask;
    // console.log('ID:', id);
    // console.log('Text:', text);
    // console.log('Completed:', completed);
    // console.log('Due Date:', dueDate);
    // console.log('Priority:', priority);

    axios.post(`https://notes-backend-system.onrender.com/tasks/update/${id}`, { text, completed, dueDate, priority })
      .then(() => fetchTasks())
      .catch(err => {
        console.error(err);
        if (err.response && err.response.status === 400) {
          console.log('Bad Request. Server expects the following fields:', err.response.data);
        }
      });
  };
  

  const deleteTask = (id) => {
    axios.delete(`https://notes-backend-system.onrender.com/tasks/${id}`)
      .then(() => fetchTasks())
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Notes Tracker</h1>

      {/* Add Task Form */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter note description"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addTask}>
          Add a Note
        </button>
      </div>

      {/* Tasks List */}
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{task.text}</span>
            <div>
              <button
                className={`btn btn-${task.completed ? 'secondary' : 'success'} btn-sm me-2`}
                onClick={() => updateTask(task._id, { text :task.text, completed: !task.completed })}
              >
                {task.completed ? 'Incomplete' : 'Complete'}
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskTracker;

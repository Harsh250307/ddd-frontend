
import React, { useState, useEffect } from 'react';
import axios from './api';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState({ title: '', description: '' });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleAddTask = async () => {
        try {
            const response = await axios.post('/tasks', taskInput);
            setTasks([...tasks, response.data]);
            setTaskInput({ title: '', description: '' });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleCompleteTask = async (id) => {
        try {
            await axios.put(`/tasks/${id}`);
            setTasks(tasks.map(task => (task._id === id ? { ...task, completed: true } : task)));
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="app">
            <h1>Task Manager</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskInput.title}
                    onChange={(e) => setTaskInput({ ...taskInput, title: e.target.value })}
                />
                <textarea
                    placeholder="Task Description"
                    value={taskInput.description}
                    onChange={(e) => setTaskInput({ ...taskInput, description: e.target.value })}
                ></textarea>
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                        <button onClick={() => handleCompleteTask(task._id)}>Complete</button>
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;

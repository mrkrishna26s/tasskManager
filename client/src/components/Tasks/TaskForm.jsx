import React, { useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import API from '../../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: 'Pending',
    assignedTo: '',
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
  
      // Create a new object excluding assignedTo if it's empty
      const taskData = { ...task };
      if (!taskData.assignedTo || taskData.assignedTo.trim() === '') {
        delete taskData.assignedTo; // Remove assignedTo if it's empty
      }
  
      await API.post('/tasks', taskData, {
        headers: {
          Authorization: token,
        },
      });
  
      onTaskCreated(); // Refresh task list
      setTask({ title: '', description: '', dueDate: '', priority: '', status: 'Pending', assignedTo: '' });
    } catch (err) {
      alert('Error creating task');
    }
  };
  

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <TextField fullWidth label="Title" name="title" value={task.title} onChange={handleChange} margin="normal" />
      <TextField fullWidth label="Description" name="description" value={task.description} onChange={handleChange} margin="normal" />
      <TextField fullWidth type="date" name="dueDate" value={task.dueDate} onChange={handleChange} margin="normal" />
      <TextField
        select
        fullWidth
        name="priority"
        label="Priority"
        value={task.priority}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>
      <Button type="submit" variant="contained">Create Task</Button>
    </Box>
  );
};

export default TaskForm;
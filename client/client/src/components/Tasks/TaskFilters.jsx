import React from 'react';
import { TextField, MenuItem, Box, Button } from '@mui/material';

const TaskFilters = ({ filters, setFilters, onSearch }) => {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setFilters({ search: '', status: '', priority: '', dueDate: '' });
    onSearch(); // refresh task list
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      <TextField name="search" label="Search" value={filters.search} onChange={handleChange} />
      <TextField select name="status" label="Status" value={filters.status} onChange={handleChange}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
      <TextField select name="priority" label="Priority" value={filters.priority} onChange={handleChange}>
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>
      <TextField
        name="dueDate"
        label="Due Before"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={filters.dueDate}
        onChange={handleChange}
      />
      <Button onClick={onSearch} variant="contained">Search</Button>
      <Button onClick={handleReset} variant="outlined">Reset</Button>
    </Box>
  );
};

export default TaskFilters;
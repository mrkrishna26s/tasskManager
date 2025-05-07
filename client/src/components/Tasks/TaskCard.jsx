import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import OverdueBadge from './OverdueBadge';
import DeleteTaskButton from './DeleteTaskButton';

const TaskCard = ({ task, onDelete }) => {
  return (
    <Card sx={{ mb: 2, backgroundColor: new Date(task.dueDate) < new Date() && task.status !== 'Completed' ? '#ffe5e5' : 'white' }}>
      <CardContent>
        <Typography variant="h6">
          {task.title}
        </Typography>
        <OverdueBadge dueDate={task.dueDate} status={task.status} />
        <Typography variant="body2">Description: {task.description}</Typography>
        <Typography variant="body2">Priority: {task.priority}</Typography>
        <Typography variant="body2">Status: {task.status}</Typography>
        <Typography variant="body2">Due Date: {new Date(task.dueDate).toLocaleDateString()}</Typography>
        <DeleteTaskButton taskId={task._id} onDelete={onDelete} />
      </CardContent>
    </Card>
  );
};

export default TaskCard;
import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTaskButton = ({ taskId, onDelete }) => {
  return (
    <IconButton onClick={() => onDelete(taskId)} color="error" title="Delete Task">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteTaskButton;

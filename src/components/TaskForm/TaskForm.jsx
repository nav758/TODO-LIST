import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const TaskForm = ({ open, handleClose, addTask}) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (taskName) {
      addTask({ taskName, description });
      setTaskName('');
      setDescription('');
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Name"
          type="text"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)} 
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}  
          onChange={(e) => setDescription(e.target.value)}  // Update description state
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;

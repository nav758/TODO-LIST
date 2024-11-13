import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Button, Typography, Switch, FormControlLabel, Drawer, Divider, List, ListItem, ListItemText, CssBaseline, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import TaskForm from '../../components/TaskForm/TaskForm'; 

const Dashbord = ({ toggleTheme }) => {
  const [checked, setChecked] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);
  const [createTask, setCreateTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [moreTask, setMoreTask] = useState(false); 
  const [newDescription, setNewDescription] = useState(''); 
  const theme = useTheme();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); 
    }
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      setNewDescription(tasks[selectedIndex].description);
    }
  }, [selectedIndex, tasks]);

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
    toggleTheme();
  };

  const handleSidebarToggle = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleTaskDialogClose = () => {
    setCreateTask(false);
  };

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
  };

  const handleTaskClick = (index) => {
    setSelectedIndex(index);
  };

  const handleAddMoreDetails = () => {
    if (newDescription.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[selectedIndex].description = ` ${newDescription}`; 
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
      setNewDescription('');  
      setMoreTask(false);  
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleSwitchChange}
                color="default"
              />
            }
            label="Dark Mode"
          />
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={openSidebar}
      >
        <Box sx={{ width: '100%' }}>
          <Button onClick={() => setCreateTask(true)}>Create Task</Button>
          <Divider />
          <List>
            {tasks.map((task, index) => (
              <ListItem
                key={index}
                button
                selected={selectedIndex === index} 
                onClick={() => handleTaskClick(index)} 
              >
               <Avatar {...stringAvatar(task.taskName)} /> &nbsp;&nbsp; <ListItemText primary={task.taskName} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.background.default,
          padding: theme.spacing(3),
          transition: 'all 0.3s ease',
          marginTop: 8,
        }}
      >
        {selectedIndex !== null ? (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2">{tasks[selectedIndex].description}</Typography>
            {moreTask && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="Add more details"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)} 
                />
                <Button onClick={handleAddMoreDetails} sx={{ marginTop: 2 }} variant="contained">
                  Add Details
                </Button>
              </Box>
            )}
            <Button onClick={() => setMoreTask(!moreTask)} sx={{ marginTop: 2 }}>
              {moreTask ? 'Cancel' : 'Add More Details'}
            </Button>
          </Box>
        ) : (
          <Typography variant="body2">Select a task to view details.</Typography>
        )}
      </Box>

      <TaskForm open={createTask} handleClose={handleTaskDialogClose} addTask={addTask} />
    </Box>
  );
};

export default Dashbord;

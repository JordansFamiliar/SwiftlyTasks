import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils';
import { useAuth } from '../../AuthContext';

function AddTaskForm({ updateTasks }) {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const [task_name, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [due_date, setDueDate] = useState('');
  const [error, setError] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const csrftoken = getCookie('csrftoken');

  if (!authenticated) {
    navigate('/swiftlytasks/login/');
  }

  const handleCancel = () => {
    navigate('/swiftlytasks/dashboard/');
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
    setError('');
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
    setError('');
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    setError('');
  };

  const handleAddTask = async () => {
    try {
      const newTask = {
        task_name,
        description,
        priority,
        due_date,
      };
      setButtonPressed(true);
      if (!task_name || !priority || !due_date) {
        setError('Please fill in all required fields.');
        return;
      }
      const response = await fetch('http://localhost:8000/swiftlytasks/add_task/',{
        method: 'POST',
        headers: {
	  'Content-Type': 'application/json',
	  'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(newTask),
        credentials: 'include'
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log('Added new task');
        updateTasks(newTask);
        navigate('/swiftlytasks/dashboard/');
      } else {
        console.error("Couldn't add new task");
        setError(responseData.message);
      }
    } catch (error) {
      console.error('An error occured ', error);
      setError('An unexpected error occured');
    }
  };

  return (
    <>
      <div className="blur-background"></div>
      <main>
        <section id="center-column">
          <div className="form-container">
            <h2>Add Task</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form className="form">
              <TextField
                label="Task Name"
                type="text"
                value={task_name}
                onChange={handleTaskNameChange}
                variant="outlined"
                margin="normal"
                fullWidth={true}
	        required
              />
              {buttonPressed && task_name === '' && (
                <p style={{ color: 'red' }}>*Task Name is required.</p>
              )}
              <TextField
                label="Description"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
                margin="normal"
                fullWidth={true}
              />

              <TextField
                label="Priority"
                type="number"
                value={priority}
                onChange={handlePriorityChange}
                variant="outlined"
                margin="normal"
                fullWidth={true}
	        required
              />
              {buttonPressed && priority === '' && (
                <p style={{ color: 'red' }}>*Priority is required.</p>
              )}

              <TextField
                label="Due Date"
                type="date"
                value={due_date}
                onChange={handleDueDateChange}
                variant="outlined"
                margin="normal"
                fullWidth={true}
	        InputLabelProps={{ shrink: true }}
	        required
              />
              {buttonPressed && due_date === '' && (
                <p style={{ color: 'red' }}>*Due Date is required.</p>
              )}

              <Button
                variant="contained"
                style={{ backgroundColor: '#000000' }}
                onClick={handleAddTask}
                fullWidth={true}
              >
                Add Task
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: '#000000' }}
                onClick={handleCancel}
                fullWidth={true}
              >
                Cancel
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default AddTaskForm;

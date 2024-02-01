import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useSelector } from 'react-redux';

function EditTaskForm({ task, setIsEditing, onCancel, onEdit }) {
  const [editedTask, setEditedTask] = useState({...task});
  const [error, setError] = useState(null);

  const handleTaskNameChange = (e) => {
    setEditedTask((prev) => ({ ...prev, task_name: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setEditedTask((prev) => ({ ...prev, description: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    setEditedTask((prev) => ({ ...prev, priority: e.target.value }));
  };

  const handleDueDateChange = (e) => {
    setEditedTask((prev) => ({ ...prev, due_date: e.target.value }));
  };

  const csrftoken = useSelector((state) => state.csrftoken.csrftoken);

  const handleEditTask = async () => {
    try {
      const response = await fetch(`https://swiftly-tasks.vercel.app/swiftlytasks/edit_task/${task.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(editedTask),
        credentials: 'include',
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log('Edited task');
        onEdit(editedTask);
        setIsEditing(false);
      } else {
        console.error("Couldn't edit task");
        setError(responseData.message);
      }
    } catch (error) {
      console.error('An error occurred: ', error);
      setError('An unexpected error occurred');
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="blur-background"></div>
      <div className="form-container">
        <h2>Edit Task</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="form">
          <TextField
            label="Task Name"
            type="text"
            value={editedTask.task_name}
            onChange={handleTaskNameChange}
            variant="outlined"
            margin="normal"
            fullWidth={true}
	    required
          />
	  {editedTask.task_name === '' && (
	    <p style={{ color: 'red' }}>Task Name is required.</p>
	  )}
          <TextField
            label="Description"
            type="text"
            value={editedTask.description}
            onChange={handleDescriptionChange}
            variant="outlined"
            margin="normal"
            fullWidth={true}
          />

          <TextField
            label="Priority"
            type="number"
            value={editedTask.priority}
            onChange={handlePriorityChange}
            variant="outlined"
            margin="normal"
            fullWidth={true}
	    required
          />
          {editedTask.priority === '' && (
            <p style={{ color: 'red' }}>priority is required.</p>
          )}

          <TextField
            label="Due Date"
            type="date"
            value={editedTask.due_date}
            onChange={handleDueDateChange}
            variant="outlined"
            margin="normal"
            fullWidth={true}
	    required
          />
          {editedTask.due_date === '' && (
            <p style={{ color: 'red' }}>Due Date is required.</p>
          )}

          <Button
            variant="contained"
	    style={{ backgroundColor: '#000000' }}
            onClick={handleEditTask}
            fullWidth={true}
          >
            Update Task
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
    </>
  );
}

export default EditTaskForm;

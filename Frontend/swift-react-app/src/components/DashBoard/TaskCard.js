import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { fetchData } from '../utils';
import styles from './TaskCard.module.css';
import EditTaskForm from '../AddTaskForm/EditTaskForm';

function TaskCard({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [csrftoken, setCsrftoken] = useState('');

  useEffect(() => {
    const fetchDataEffect = async () => {
      const token = await fetchData();
      setCsrftoken(token);
    };
    fetchDataEffect();
  }, []);

  const handleCheckButtonClick = useCallback(async () => {
    try {
      if (!csrftoken || csrftoken === '') {
        return;
      }
      const response = await fetch(`https://swiftly-tasks.vercel.app/swiftlytasks/delete_task/${task.id}/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        credentials: 'include',
      });

      const responseData = await response.json();

      if (responseData.success) {
        console.log('Task deleted successfully');
        onDelete(task);
      } else {
        console.error("Couldn't delete task");
      }
    } catch (error) {
      console.error('An error occurred during task deletion', error);
    }
  }, [csrftoken, onDelete, task]);

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {isEditing ? (
	<EditTaskForm
	  task={task}
          setIsEditing={setIsEditing}
          onCancel={() => setIsEditing(false)}
	  onEdit={onEdit}
        />
      ) : (
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Typography variant="h6" className={styles.taskName}>
              {task.task_name}
            </Typography>
            <Typography variant="body1" className={styles.description}>
              Description: {task.description}
            </Typography>
            <Typography variant="body1" className={styles.priority}>
              Priority: {task.priority}
            </Typography>
            <Typography variant="body1" className={styles.dueDate}>
              Due Date: {task.due_date}
            </Typography>
            <Typography variant="body1" className={styles.status}>
              Status: {task.status}
            </Typography>
            <Button variant="contained" onClick={handleCheckButtonClick} className={styles.checkButton}>
              Done
            </Button>
	    <Button variant="contained" onClick={handleEditButtonClick} className={styles.editButton}>
	      Edit
	    </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default TaskCard;


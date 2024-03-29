import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import TaskCard from './TaskCard';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { deleteTask, editTask, fetchTasks, setSortBy } from '../../redux/taskSlice';


function Dashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const sortOption = useSelector((state) => state.task.sortBy);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dashboard | Swiftly Tasks";
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setAuthenticated(localStorage.getItem('authenticated'));
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const fetchTasksFromServer = async () => {
      try {
        const response = await fetch('https://swiftly-tasks.vercel.app/swiftlytasks/dashboard/', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        dispatch(fetchTasks({tasks: data.tasks }));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (!loading) {
      if (!authenticated) {
        navigate('/swiftlytasks/login/');
      } else {
        fetchTasksFromServer();
      }
    }
  }, [navigate, authenticated, loading, dispatch]);

  const deleteTaskHandler = (deletedTask) => {
    dispatch(deleteTask({ deletedTask }));
  };

  const editTaskHandler = (editedTask) => {
    dispatch(editTask({ editedTask }));
  };

  const handleAddTask = () => {
    navigate('/swiftlytasks/add_task/');
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;

    dispatch(setSortBy(newSortBy));
  };

  return (
    <>
      <div className="heading-container">
        <h1>Dashboard</h1>
      </div>
      <main>
        <section id="center-column">
          <div className={styles.container}>
            <div className={styles.headerRow}>
              <div className={styles.sortDropdownContainer}>
                <label htmlFor="sortDropdown" className={styles.sortLabel}>
                  Sort By:
                </label>
                <select id="sortDropdown" className={styles.sortDropdown} onChange={handleSortChange} value={sortOption}>
                  <option value="priority-asc">Priority (Ascending)</option>
                  <option value="priority-desc">Priority (Descending)</option>
                  <option value="due-date">Due Date</option>
                </select>
              </div>
              <Button variant="contained" color="primary" className={styles.button} onClick={handleAddTask}>
                Add Task
              </Button>
            </div>
            {tasks.length === 0 ? (
	      <Card className={styles.card}>
		<CardContent className={styles.cardContent}>
                  <Typography variant="h2" className={styles.clear}>
		    All Clear!
		  </Typography>
		</CardContent>
	      </Card>
            ) : (
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={deleteTaskHandler} onEdit={editTaskHandler} />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;

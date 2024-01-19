import { createSlice } from '@reduxjs/toolkit';

// Sorting function
const sortTasks = (tasks, sortBy) => {
  if (!tasks || !tasks.length) {
    return [];
  }

  const sortedTasks = [...tasks];

  if (sortBy === 'priority-asc') {
    sortedTasks.sort((a, b) => a.priority - b.priority);
  } else if (sortBy === 'priority-desc') {
    sortedTasks.sort((a, b) => b.priority - a.priority);
  } else if (sortBy === 'due-date') {
    sortedTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  }

  if (sortedTasks.length !== tasks.length) {
    console.log("error: length");
  }
  return sortedTasks;
};

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    sortBy: 'priority-asc',
  },
  reducers: {
    editTask: (state, action) => {
      const { editedTask } = action.payload;
      state.tasks = state.tasks.map(task => (task.id === editedTask.id ? editedTask : task));
      state.tasks = sortTasks([...state.tasks], state.sortBy);
    },
    deleteTask: (state, action) => {
      const { deletedTask } = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== deletedTask.id);
      state.tasks = sortTasks([...state.tasks], state.sortBy);
    },
    addTask: (state, action) => {
      const { newTask } = action.payload;
      state.tasks = [...state.tasks, newTask];
      state.tasks = sortTasks([...state.tasks, newTask], state.sortBy);
    },
    fetchTasks: (state, action) => {
      state.tasks = action.payload.tasks;
      state.tasks = sortTasks([...action.payload.tasks], state.sortBy);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.tasks = sortTasks([...state.tasks], action.payload);
      console.log('Sorted Tasks: ', state.sortedTasks);
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.tasks = sortTasks([...action.payload], state.sortBy);
    },
  },
});


export const { editTask, deleteTask, addTask, fetchTasks, setSortBy, setTasks } = taskSlice.actions;
export default taskSlice.reducer;

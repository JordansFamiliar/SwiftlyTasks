import { createSlice } from '@reduxjs/toolkit';

const csrftokenSlice = createSlice({
  name: 'csrftoken',
  initialState: {
    csrftoken: '',
  },
  reducers: {
    setCsrftoken: (state, action) => {
      state.csrftoken = action.payload;
    },
  },
});

export const { setCsrftoken } = csrftokenSlice.actions;
export default csrftokenSlice.reducer;

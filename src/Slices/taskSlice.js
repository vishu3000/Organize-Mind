// src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskAdded: false,
  taskObject: [],
  modelStatus: false,
  lists: [],
  updateId: null,
  userInfo: {},
};

const HPtaskSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    taskAdded: (state, action) => {
      state.taskAdded = action.payload;
      return state;
    },
    taskObject: (state, action) => {
      state.taskObject = action.payload;
      return state;
    },
    modalToggler: (state, action) => {
      state.modelStatus = action.payload;
      return state;
    },
    lists: (state, action) => {
      state.lists = action.payload;
      return state;
    },
    updateTaskId: (state, action) => {
      state.updateId = action.payload;
      return state;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      return state;
    },
  },
});

export const {
  taskAdded,
  taskObject,
  modalToggler,
  lists,
  updateTaskId,
  setUserInfo,
} = HPtaskSlice.actions;
export default HPtaskSlice.reducer;

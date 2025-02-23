import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

const todo = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter((item, index) => {
        return index !== action.payload;
      });
    },
    done: (state, action) => {
      state.value = state.value.filter((item, index) => {
        return index !== action.payload;
      });
    },
  },
});

export default todo.reducer;
export const { add, remove, done } = todo.actions;

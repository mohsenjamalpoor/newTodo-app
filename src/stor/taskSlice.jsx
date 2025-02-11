import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { taskList } from "../statics/Data";


const taskSlice = createSlice({
  name: "tasks",
  initialState: taskList,
  reducers: {
    addTask: (state, action) => {
      console.log("------>>", state, action);
      const uuid = uuidv4();
      console.log("uuidv4", uuid);
      state.push({ ...action.payload, id: uuid });
    },
    editTask: (state, action) => {
      console.log("action.payload------>", action.payload);
      const index = state.findIndex((task) => task.id === action.payload.id);
      console.log("2======>", state[index]);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      const uu = state.find((task) => task.id === id);
      if (uu) {
        return state.filter((f) => f.id !== id);
      }
    },
    resetFilters:() => taskList,
  },
});
export const { addTask, editTask, deleteTask, resetFilters } = taskSlice.actions;
export default taskSlice.reducer;

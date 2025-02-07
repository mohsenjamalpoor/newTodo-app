


 import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';
import { taskList } from "../statics/Data";






const taskSlice = createSlice({
    name:"tasks",
    initialState:taskList,
    filter:"all",
    reducers:{
      addTask: (state, action) => {
       state.push(action.payload);

      },
      editTask: (state, action) => {

        console.log("action.payload------>", action.payload)
        const index = state.findIndex(task => task.id === action.payload.id);
        console.log("2======>" , state[index])
        if (index !== -1) {
          state[index] = action.payload;
        }
      //  const {id, name, priority, status, date } = action.payload;
      //  state.tasks = state.tasks.map(task => (
        // task.id === action.payload.id ? action.payload : task
      //  ))
      //  const uu = state.find(task => task.id === id);
      //  if(uu) {
      //   uu.name = name;
      //   uu.priority = priority;
      //   uu.status = status;
      //   uu.date = date

      //  }

      },
      deleteTask: (state, action) => {

        // state.tasks = state.tasks.filter(task => task.id !== action.payload);
        const {id} = action.payload;
        const uu = state.find(task => task.id === id);
        if(uu){
          return state.filter(f => f.id !== id);
        }
        

    },
    filterTask: (state, action) => {
      state.filter = action.payload;
    },
    resetTask: (state) => {
      state.tasks = [];
    }
  }
})
export const {addTask, editTask,deleteTask, filterTask, resetTask} = taskSlice.actions;
export default taskSlice.reducer;
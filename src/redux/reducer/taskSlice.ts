import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, Todo } from "../../type";
import taskApi from "../../configAPI/Api";
const namespace = "todo";

const getTodos = createAsyncThunk(`${namespace}/getTodos`, async () => {
  try {
    const response = await taskApi.getTaskData();
    return response.data.slice(0, 7);
  } catch (error) {
    console.log(error);
  }
});

const deleteTodo = createAsyncThunk(
  `${namespace}/deleteTodos`,
  async (id: string) => {
    try {
      const response = await taskApi.deleteTaskData(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const addTodo = createAsyncThunk(
  `${namespace}/addTodos`,
  async (taskTodo: { modifyingTaskId: string; task: string }) => {
    try {
      const randomNum = Math.floor(Math.random() * 1000);
      const RANDOM_EMAIL = `${randomNum + taskTodo.modifyingTaskId}@gmail.com`;
      const response = await taskApi.postTaskData({
        name: taskTodo.task,
        // api default infomation
        gender: "male",
        email: RANDOM_EMAIL,
        status: "active",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const updateTodo = createAsyncThunk(
  `${namespace}/updateTodos`,
  async (update: { id: string; updatedName: string }) => {
    try {
      const { id, updatedName } = update;
      const response = await taskApi.putTaskData(id, updatedName);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);


const initialState: State[] = [{ id: "", name: "" }];
const todoSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET todo list
    builder.addCase(
      getTodos.fulfilled,
      (state, action: PayloadAction<Todo>) => {
        state.splice(0, 1, action.payload);
      }
    );
    builder.addCase(getTodos.rejected, (state, action) => {});

    // Delete
    builder.addCase(deleteTodo.fulfilled, (state, action: any) => {
      let index = state.indexOf(action.payload);
      state.splice(index, 1);
    });

    builder.addCase(deleteTodo.rejected, (state, action: any) => {
      console.log("fail to delete data");
    });

    // addTodo
    builder.addCase(addTodo.fulfilled, (state, action: any) => {
      state = [...state, action.payload];
    });

    builder.addCase(addTodo.rejected, (state, action: any) => {
      console.log("fail to add task");
    });

    // UPDATE task
    builder.addCase(updateTodo.fulfilled, (state, action: any) => {
      state = [...state, action.payload];
    });

    builder.addCase(updateTodo.rejected, (state, action: any) => {
      console.log("fail to update task");
    });
  },
});

export const todoReducer = todoSlice.reducer;

const methodApi = {
  getTodos,
  deleteTodo,
  addTodo,
  updateTodo,
};

export default methodApi;

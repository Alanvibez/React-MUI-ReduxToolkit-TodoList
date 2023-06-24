import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ToDoState, ToDo } from '../../models/IToDo';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/todos?_limit=20'
  );
  return response.data;
});

export const initialState: ToDoState = {
  todos: [],
};

const toDoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addToDo(state, action: PayloadAction<ToDo>) {
      state.todos.push(action.payload);
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    // setTodos: (state, action: PayloadAction<ToDo[]>) => {
    //   state.todos = action.payload;
    // },

    changeTodo: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const { id, title } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: title,
          };
        }
        return todo;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const { addToDo, deleteTodo, toggleTodo, changeTodo } =
  toDoSlice.actions;

export default toDoSlice.reducer;

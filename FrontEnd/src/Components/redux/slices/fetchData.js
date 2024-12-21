import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Add Task Async action
export const AddTaskAsync = createAsyncThunk(
  'task/AddTask',
  async (task, { rejectWithValue }) => {
      try {
          const token = sessionStorage.getItem('token'); // Retrieve token

          const response = await fetch('http://localhost:3003/Tasks', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // Add token to headers
              },
              body: JSON.stringify(task),
          });

          if (!response.ok) {
            window.location.replace("http://http://localhost:3000/");
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to add task');
          }

          const data = await response.json();
          return data; // Return the created task
      } catch (error) {
          return rejectWithValue(error.message || 'Failed to add task');
      }
  }
);


export const deleteTaskAsync = createAsyncThunk(
  'task/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); // Or localStorage if needed

      const response = await fetch(`http://localhost:3003/Tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        window.location.replace("http://http://localhost:3000/");
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete task');
      }

      return taskId; // Return the deleted task's ID
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete task');
    }
  }
);


export const updateTaskAsync = createAsyncThunk(
  'task/editTask', 
  async (task, { rejectWithValue, getState }) => {


    const { tasks } = getState().tasks;


    const taskIndex = tasks.findIndex(t => t._id === task._id);



    if (taskIndex === -1) {
      return rejectWithValue('Task does not exist');
    }

    const taskExists = tasks.some(
      (existingTask) =>
        existingTask._id !== task._id && 
        existingTask.Subject === task.Subject &&
        existingTask.CompleteDate === task.CompleteDate
    );

    if (taskExists) {
      return rejectWithValue('Task with the same Subject and CompleteDate already exists');
    }

    try {
      const token = sessionStorage.getItem('token'); // Or localStorage if needed

      const response = await fetch(`http://localhost:3003/Tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(task),
      });




      if (!response.ok) {
        window.location.replace("http://http://localhost:3000/");

        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Failed to update task');
      }

      const data = await response.json();
      return data; // Return the updated task
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update task');
    }
  }
);


export const getTasksAsync = createAsyncThunk(
  'task/getTasks', 
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch('http://localhost:3003/Tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        window.location.replace("http://http://localhost:3000/");

        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch tasks');
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const initialState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchData = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(AddTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(AddTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setTasks, updateTask, deleteTask } = fetchData.actions;

export default fetchData.reducer;

export const selectStatus = (state) => state.tasks.status;
export const selectTasks = (state) => state.tasks.tasks;

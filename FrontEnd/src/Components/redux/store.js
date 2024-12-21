// store.js
import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "./slices/fetchData"; // Import the slice

const store = configureStore({
  reducer: {
    tasks: fetchDataReducer, // Set the tasks reducer
  },
});

export default store;

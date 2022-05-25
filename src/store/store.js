// src/store.index.js
import { configureStore } from '@reduxjs/toolkit';
import myReducer from '../slices';

const store = configureStore({
  reducer: {
    albums: myReducer,
  },
});

export default store;

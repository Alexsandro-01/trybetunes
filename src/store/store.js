// src/store.index.js
import { configureStore } from '@reduxjs/toolkit';
import myReducer from '../slices';

const store = configureStore({
  reducer: {
    data: myReducer,
  },
});
// console.log(store.albums);
export default store;

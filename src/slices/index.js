// src/reducers/index.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const addSlice = createSlice({
  name: 'albuns',
  initialState,
  reducers: {
    addAlbuns: (state, action) => {
      state = [...action.payload];
    },
  },
});

export const { addAlbuns } = addSlice.actions;

export default addSlice.reducer;

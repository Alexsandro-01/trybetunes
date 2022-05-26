// src/reducers/index.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  albums: [],
};

const addSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addAlbuns: (state, action) => {
      state.albums = [...action.payload];
    },
  },
});

export const { addAlbuns } = addSlice.actions;

export default addSlice.reducer;

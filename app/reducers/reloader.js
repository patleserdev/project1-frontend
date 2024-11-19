
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: false,
};

export const reloadSlice = createSlice({
 name: 'reloader',

  initialState,
 reducers: {
   reloading: (state, action) => {
     state.value=action.payload;
   },
 },
});

export const { reloading } = reloadSlice.actions;
export default reloadSlice.reducer;
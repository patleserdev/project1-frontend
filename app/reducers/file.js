import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: null,
};

export const fileSlice = createSlice({
 name: 'file',

  initialState,
 reducers: {
    addFile: (state, action) => {
     state.value=action.payload;
   },
   deleteFile: (state, action) => {

      state.value=null;
    
    
  },

 },
});

export const { addFile,deleteFile } = fileSlice.actions;
export default fileSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: false,
};

export const editmodeSlice = createSlice({
 name: 'editmode',

  initialState,
 reducers: {
    activeEdit: (state, action) => {
     state.value=action.payload;
   },


 },
});

export const { activeEdit } = editmodeSlice.actions;
export default editmodeSlice.reducer;

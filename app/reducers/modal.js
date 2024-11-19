import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: false,
};

export const modalSlice = createSlice({
 name: 'modal',

  initialState,
 reducers: {
    openModal: (state, action) => {
     state.value=action.payload;
   }

 },
});

export const { openModal } = modalSlice.actions;
export default modalSlice.reducer;

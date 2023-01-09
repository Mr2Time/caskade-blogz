import { createSlice } from "@reduxjs/toolkit";

const initialState = {

};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setWholeState: (state, action) => {
      return {
       // set state to action.payload
       ...action.payload
      }
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    getState: (state) => {
      return state;
    },
  },
});

export const { setWholeState, setContent, getState } = blogSlice.actions;
export default blogSlice.reducer;

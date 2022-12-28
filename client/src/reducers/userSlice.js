import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    isValid: false,
};

const userSlice = createSlice({
  name: "blog",
  initialState,
    reducers: {
        login: (state, action) => {
            state = action.payload;
        },
        signup: (state, action) => {
            state = action.payload;
        },
        logout: (state) => {
            state = {};
        }
    }
  },
);

export const { } = userSlice.actions;
export default userSlice.reducer; 

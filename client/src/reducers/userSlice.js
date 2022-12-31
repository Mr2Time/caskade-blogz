import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    email: "",
    blogs: [],
    auth: localStorage.getItem("token") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
    reducers: {
        userData: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.blogs = action.payload.blogs;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        logout: (state) => {
            state = {};
            localStorage.removeItem("token");
        }
    }
  },
);

export const { userData, logout, setAuth } = userSlice.actions;
export default userSlice.reducer; 

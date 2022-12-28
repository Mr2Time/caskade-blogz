import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './reducers/blogSlice';
import userSlice from './reducers/userSlice';

const store = configureStore({
    reducer: {
        blog: blogReducer,
        user: userSlice,
    },
})

export default store;
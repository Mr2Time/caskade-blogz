import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import blogReducer from './reducers/blogSlice';

const store = configureStore({
    reducer: blogReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store;
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    title: "",
    content: "",
    description: "",
    tags: [],
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setWholeState: (state, action) => {
            console.log("incoming state is: ", action.payload)
                state.title = action.payload.title;
                state.content = action.payload.content;
                state.description = action.payload.description;
                state.tags = action.payload.tags;

        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        getState: (state) => {
            return state;
        }
    }
})

export const {setWholeState, setContent, getState} = blogSlice.actions;
export default blogSlice.reducer;
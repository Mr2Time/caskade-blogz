import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  content: `<h3 style="text-align: center"><strong><em>Dewdrops and Diamonds</em></strong></h3><p style="text-align: center">Dewdrops and Diamonds, a morning delight</p><p style="text-align: center">Nature's jewels, shining so bright</p><p style="text-align: center">The sun rises, a fiery orb in the sky</p><p style="text-align: center">As the dew on the grass shimmers and sighs</p><p style="text-align: center">The flowers bloom, a riot of color and scent</p><p style="text-align: center">The world awakens, with magic and intent</p><p style="text-align: center">The birds sing sweet melodies, as the day begins</p><p style="text-align: center">And the dewdrops and diamonds, a symbol of life's wins</p><p style="text-align: center">But as the night falls, and the stars come out to play</p><p style="text-align: center">The dew on the grass fades, and the world fades away</p><p style="text-align: center">Until the dawn breaks, and a new day begins</p><p style="text-align: center">Dewdrops and diamonds, a magical spin</p><p><br><br></p>`,
  description: "",
  tags: [],
  headerImg: "",
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setWholeState: (state, action) => {
      console.log("incoming state is: ", action.payload);
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
    },
  },
});

export const { setWholeState, setContent, getState } = blogSlice.actions;
export default blogSlice.reducer;

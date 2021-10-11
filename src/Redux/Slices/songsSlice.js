import { createSlice } from "@reduxjs/toolkit";

export const songsSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
  },
  reducers: {
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
  },
});

export const { addSong } = songsSlice.actions;

export default songsSlice.reducer;

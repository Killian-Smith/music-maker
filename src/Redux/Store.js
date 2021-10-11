import { configureStore } from "@reduxjs/toolkit";
import songsSlice from "./Slices/songsSlice";

export default configureStore({
  reducer: {
    songs: songsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

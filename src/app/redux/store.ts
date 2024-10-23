// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import postsReducer from "./postsSlice";

// Configure the store
export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

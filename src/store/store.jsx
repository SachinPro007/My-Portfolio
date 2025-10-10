import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/themeReducer";


const store = configureStore({
  reducer: {
    themeReducer: themeReducer
  },
  // eslint-disable-next-line
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

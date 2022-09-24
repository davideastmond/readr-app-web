import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./reducers/app-reducer";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./reduxSlice";
import loadingSlice from "./loadingSlice";
export const store = configureStore({
  reducer: {
    duLieu: reduxSlice,
    loading: loadingSlice,
  },
});

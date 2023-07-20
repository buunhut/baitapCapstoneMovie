import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isLogin: false,
  user: {},
};

const reduxSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {
    //đường dispatch về
    dangNhap: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    dangXuat: (state, action) => {
      state.isLogin = false;
      state.user = {};
    },
  },
});
export const { dangNhap, dangXuat } = reduxSlice.actions;
export default reduxSlice.reducer;

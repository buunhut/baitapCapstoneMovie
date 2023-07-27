import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { giaoTiepAPI } from "./giaoTiepAPI";
import { myLocalStore } from "./myLocalStore";
const initialState = {
  isLogin: false,
  user: myLocalStore.goiLocalStore("user"),
  danhSachNguoiDung: [],
};

export const getAllUser = createAsyncThunk("nguoiDung/getAllUser", async () => {
  const result = await giaoTiepAPI.layThongTinNguoiDung();
  return result.data.content;
});
// export const addUser = createAsyncThunk("nguoiDung/addUser", async () => {
//   const result = await giaoTiepAPI.themNguoiDung();
//   return result.data.content;
// });

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
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.danhSachNguoiDung = action.payload;
    });
    // builder.addCase(addUser.fulfilled, (state, action) => {
    //   state.danhSachNguoiDung = action.payload;
    // });
  },
});
export const { dangNhap, dangXuat } = reduxSlice.actions;
export default reduxSlice.reducer;

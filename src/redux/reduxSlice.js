import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { giaoTiepAPI } from "./giaoTiepAPI";
import { myLocalStore } from "./myLocalStore";

//set giá trị cho isLogin ban đầu
let isLogin = false;

//đọc dữ liệu từ local lên
const user = myLocalStore.goiLocalStore("user");

//nếu có dữ liệu thì set lại giá trị cho isLogin
if (user !== null) {
  isLogin = true;
}

//giá trị state khởi tạo
const initialState = {
  isLogin,
  user,
  danhSachNguoiDung: [],
  danhSachPhim: [],
  thongTinPhimCanSua: {},
};

// console.log(initialState.danhSachPhim);
//khởi tạo reduxSlice, export default reduxSlice ở cuối trang, để qua file configStore xài,
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
    chinhSuaPhim: (state, action) => {
      state.thongTinPhimCanSua = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.danhSachNguoiDung = action.payload;
    });
    builder.addCase(getAllDanhSachPhim.fulfilled, (state, action) => {
      state.danhSachPhim = action.payload;
    });
  },
});

//export lấy thông tin người dùng, trong extraReducers,
export const getAllUser = createAsyncThunk("nguoiDung/getAllUser", async () => {
  const result = await giaoTiepAPI.layThongTinNguoiDung();
  return result.data.content;
});
export const getAllDanhSachPhim = createAsyncThunk(
  "nguoiDung/getAllDanhSachPhim",
  async () => {
    const result = await giaoTiepAPI.layDanhSachPhim();
    return result.data.content;
  }
);

export const { dangNhap, dangXuat } = reduxSlice.actions; //export để gọi dispatch về cho chức năng đăng nhập và đăng xuất
export default reduxSlice.reducer;

// giaoTiepAPI
// .layDanhSachPhongVe(maLichChieu)
// .then((result) => {
//   setdanhSachPhongVe(result.data.content);
//   // dispatch(set_loading_ended());
//   // dispatch(set_loading_started());
//   setIsLoading(false);
// })
// .catch((error) => {
//   // dispatch(set_loading_ended());
//   setIsLoading(false);
//   console.log(error);
// });

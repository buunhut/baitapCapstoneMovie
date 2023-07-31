import axios from "axios";
import { myLocalStore } from "./myLocalStore";

const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNyIsIkhldEhhblN0cmluZyI6IjE5LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjk0NDAwMDAwMCIsIm5iZiI6MTY3OTg1MDAwMCwiZXhwIjoxNzAzMDkxNjAwfQ.28D2Nfp6Hy4C5u8pvZDIxH2pzlYoKIqgfsJLI_Dque4";
const Authorization =
  "Bearer " + myLocalStore.goiLocalStore("user")?.accessToken;
const Authorization_Xoa =
  "bearer " + myLocalStore.goiLocalStore("user")?.accessToken;

// console.log(Authorization);

export const giaoTiepAPI = {
  laydanhSachBanner: () => {
    const result = axios({
      method: "get",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  checkDangNhap: (data) => {
    const result = axios({
      method: "post",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      headers: {
        TokenCybersoft,
      },
      data: data,
    });
    return result;
  },
  dangKy: (data) => {
    const result = axios({
      method: "post",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
      headers: {
        TokenCybersoft,
      },
      data: data,
    });
    return result;
  },
  layDanhSachPhim: () => {
    const result = axios({
      method: "get",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  layThongTinHeThongRap: () => {
    const result = axios({
      method: "get",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  layThongTinLichChieuHeThongRap: (maHeThongRap) => {
    const result = axios({
      method: "get",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=GP09`,
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  layThongTinNguoiDung: () => {
    const result = axios({
      method: "get",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  xoaNguoiDung: (maNguoiDung) => {
    const result = axios({
      method: "delete",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${maNguoiDung}`,
      headers: {
        TokenCybersoft,
        Authorization,
      },
    });
    return result;
  },
  themNguoiDung: (data) => {
    const result = axios({
      method: "post",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      headers: {
        TokenCybersoft,
        Authorization,
      },
      data: data,
    });
    return result;
  },
  capNhatThongTinNguoiDung: (data) => {
    // const tokenXoa = myLocalStore.goiLocalStore("user");
    const result = axios({
      method: "post",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      headers: {
        TokenCybersoft,
        Authorization,
      },

      data: data,
    });
    return result;
  },
  layThongTinPhim: (maPhim) => {
    const result = axios({
      method: "get",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`,
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  layThongTinLichChieuPhim: (maPhim) => {
    const result = axios({
      method: "get",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  layDanhSachPhongVe: (maLichChieu) => {
    const result = axios({
      method: "get",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
      headers: {
        TokenCybersoft,
      },
    });
    return result;
  },
  datVe: (data) => {
    const result = axios({
      method: "POST",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
      headers: {
        TokenCybersoft,
        Authorization,
      },
      data: data,
    });
    return result;
  },
  xoaPhim: (maPhim) => {
    const result = axios({
      method: "delete",
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
      headers: {
        TokenCybersoft,
        Authorization: Authorization_Xoa,
      },
    });
    return result;
  },
  themPhimUploadHinh: (formData) => {
    const result = axios({
      method: "post",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
      headers: {
        TokenCybersoft,
        Authorization: Authorization_Xoa,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    return result;
  },
  capNhatPhimUpload: (formData) => {
    const result = axios({
      method: "post",
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
      headers: {
        TokenCybersoft,
        Authorization,
      },
      data: formData,
    });
    return result;
  },
};

import React, { useEffect, useState } from "react";
import MyHeader from "./MyHeader";
import { useNavigate, useParams } from "react-router-dom";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import "./datvexemphim.scss";
import MyFooter from "./MyFooter";
import { useDispatch, useSelector } from "react-redux";
// import {
//   set_loading_ended,
//   set_loading_started,
// } from "../../redux/loadingSlice";
import PageLoading from "./PageLoading";

const DatVeXemPhim = () => {
  const [danhSachPhongVe, setdanhSachPhongVe] = useState({});
  const maLichChieu = useParams().id;
  // console.log(maLichChieu);

  // const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state.loading);
  const [isLoading, setIsLoading] = useState(true);
  const duLieu = useSelector((state) => state.duLieu);
  const isLogin = duLieu.isLogin;
  const navigate = useNavigate();
  useEffect(() => {
    //kiểm tra xem có đăng nhập chưa

    // dispatch(set_loading_started());
    giaoTiepAPI
      .layDanhSachPhongVe(maLichChieu)
      .then((result) => {
        setdanhSachPhongVe(result.data.content);
        // dispatch(set_loading_ended());
        // dispatch(set_loading_started());
        setIsLoading(false);
      })
      .catch((error) => {
        // dispatch(set_loading_ended());
        setIsLoading(false);
        console.log(error);
      });
  }, [maLichChieu]);
  const { danhSachGhe, thongTinPhim } = danhSachPhongVe;
  //chọn ghế
  const handleChonGhe = (index) => {
    setdanhSachPhongVe((danhSachPhongVe) => {
      const updateDanhSachPhongVe = { ...danhSachPhongVe };
      updateDanhSachPhongVe.danhSachGhe[index].daChon =
        !danhSachPhongVe.danhSachGhe[index].daChon;
      return updateDanhSachPhongVe;
    });
  };
  //danh sách ghế đã chon
  const danhSachGheDaChon = danhSachGhe?.filter((item) => item.daChon === true);
  let tongTien = 0;
  danhSachGhe?.forEach((item) => {
    if (item.daChon === true) {
      return (tongTien += item.giaVe);
    }
  });

  if (!isLogin) {
    navigate("/dangnhap");
  } else {
    return (
      <div>
        <div>{isLoading ? <PageLoading /> : <></>}</div>
        <MyHeader />
        <div id="datVe">
          <div className="datVeContent">
            {/* <div className="manHinh">Màn hình</div> */}

            <div className="danhSachGhe">
              {danhSachGhe?.map((item, index) => {
                return (
                  <button
                    type="button"
                    key={index}
                    disabled={item.daDat}
                    style={{
                      backgroundColor: item.daChon
                        ? "blueviolet"
                        : item.daDat
                        ? "red"
                        : item.loaiGhe === "Thuong"
                        ? "Green"
                        : "orange",
                    }}
                    onClick={() => handleChonGhe(index)}
                  >
                    {item.tenGhe}
                  </button>
                );
              })}
            </div>
            <div className="ghiChu">
              <div className="ghiChuContent">
                <div className="daDat"></div>
                <span>Đã đặt</span>
              </div>
              <div className="ghiChuContent">
                <div className="gheThuong"></div>
                <span>Ghé thường</span>
              </div>
              <div className="ghiChuContent">
                <div className="gheVIP"></div>
                <span>Ghé VIP</span>
              </div>
            </div>
          </div>
          <div className="thongTinDatVe">
            <p>Thông tin đặt vé</p>
            <div>
              <span style={{ fontWeight: "bold" }}>Tên phim:</span>{" "}
              <h1 style={{ fontWeight: "bold" }}> {thongTinPhim?.tenPhim}</h1>
            </div>
            <div>
              <span>Cụm rạp:</span>
              <h1> {thongTinPhim?.tenCumRap}</h1>
            </div>
            <div>
              <span>Rạp:</span>
              <h1> {thongTinPhim?.tenRap}</h1>
            </div>
            <div>
              <span>Địa chỉ:</span>
              <h1> {thongTinPhim?.diaChi}</h1>
            </div>

            <div>
              <span>Ngày giờ chiếu: </span>
              <h1>
                {thongTinPhim?.ngayChieu} ~ {thongTinPhim?.gioChieu}
              </h1>
            </div>
            <span>Đã chọn:</span>

            <div>
              <div className="listGhe">
                {danhSachGheDaChon?.map((item, index) => {
                  return <span key={index}>Ghế {item.tenGhe}</span>;
                })}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Thành tiền:</span>
              <h1 style={{ fontWeight: "bold" }}>
                {" "}
                {tongTien !== 0 ? tongTien.toLocaleString() + "vnđ" : ""}{" "}
              </h1>
            </div>

            <button type="button">Đặt vé</button>
          </div>
        </div>
        <MyFooter />
      </div>
    );
  }
};

export default DatVeXemPhim;

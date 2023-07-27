import React, { useEffect, useState } from "react";
import MyHeader from "./MyHeader";
import { useParams } from "react-router-dom";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import "./datvexemphim.scss";

const DatVeXemPhim = () => {
  const [danhSachPhongVe, setdanhSachPhongVe] = useState({});
  const maLichChieu = useParams().id;
  // console.log(maLichChieu);

  useEffect(() => {
    giaoTiepAPI
      .layDanhSachPhongVe(maLichChieu)
      .then((result) => {
        setdanhSachPhongVe(result.data.content);
      })
      .catch((error) => {
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

  return (
    <div>
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
    </div>
  );
};

export default DatVeXemPhim;

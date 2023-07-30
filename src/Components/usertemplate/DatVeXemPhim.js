import React, { useEffect, useState } from "react";
import MyHeader from "./MyHeader";
import { useNavigate, useParams } from "react-router-dom";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import "./datvexemphim.scss";
import MyFooter from "./MyFooter";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "./PageLoading";
import { message } from "antd";

const DatVeXemPhim = () => {
  const [danhSachPhongVe, setdanhSachPhongVe] = useState({}); // lay data tu API
  const [isLoading, setIsLoading] = useState(true);
  const [datVe, setDatVe] = useState(false);
  // state do nguoi dung click , danh sash ghe --> render ra da chon

  const maLichChieu = useParams().id;
  // console.log(maLichChieu);

  // const dispatch = useDispatch();
  // const { isLoading } = useSelector((state) => state.loading);
  const duLieu = useSelector((state) => state.duLieu);
  const isLogin = duLieu.isLogin;
  const navigate = useNavigate();
  useEffect(() => {
    giaoTiepAPI
      .layDanhSachPhongVe(maLichChieu)
      .then((result) => {
        setdanhSachPhongVe(result.data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        // dispatch(set_loading_ended());
        setIsLoading(false);
        console.log(error);
      });
  }, [maLichChieu]);

  const { danhSachGhe, thongTinPhim } = danhSachPhongVe;

  // console.log(danhSachGhe);
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
  const danhSachVe = danhSachGhe?.filter((item) => item.daChon === true);
  let tongTien = 0;
  danhSachGhe?.forEach((item) => {
    if (item.daChon === true) {
      return (tongTien += item.giaVe);
    }
  });
  //thông tin đạt vé
  const thongTinDatVe = {
    maLichChieu,
    danhSachVe,
  };
  const [messageApi, contextHolder] = message.useMessage();

  const handleDatVe = (thongTinDatVe) => {
    if (danhSachVe.length > 0) {
      giaoTiepAPI
        .datVe(thongTinDatVe)
        .then((result) => {
          setDatVe(true);
        })
        .catch((error) => {
          console.log(error);
          messageApi.error("Đặt vé thất bại");
        });
      // console.log(result);
      // setIsLoading(true);

      giaoTiepAPI
        .layDanhSachPhongVe(maLichChieu)
        .then((result) => {
          setdanhSachPhongVe(result.data.content);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
      messageApi.success("Đặt vé thành công");
    } else {
      messageApi.error("Bạn chưa chọn ghé");
    }
  };

  if (!isLogin) {
    navigate("/dangnhap");
  } else {
    return (
      <div>
        <div>{isLoading ? <PageLoading /> : <></>}</div>
        <MyHeader />
        <div id="datVe">
          {contextHolder}

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
                {danhSachVe?.map((item, index) => {
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

            <button type="button" onClick={() => handleDatVe(thongTinDatVe)}>
              Đặt vé
            </button>

            {/* <p className="thongBao">{datVe ? "Đặt vé thành công" : ""}</p> */}
          </div>
        </div>
        <MyFooter />
      </div>
    );
  }
};

export default DatVeXemPhim;

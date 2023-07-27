import React, { useEffect, useState } from "react";
import "./chitietphim.scss";
import MyHeader from "./MyHeader";
import { useParams } from "react-router-dom";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { Result } from "antd";

const ChiTietPhim = () => {
  const maPhim = useParams().id;
  const [thongTinPhim, setThongTinPhim] = useState({});
  const [thongTinLichChieuPhim, setThongTinLichChieuPhim] = useState([]);

  useEffect(() => {
    //gọi API mã phim về
    giaoTiepAPI
      .layThongTinPhim(maPhim)
      .then((result) => {
        setThongTinPhim(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
    giaoTiepAPI
      .layThongTinLichChieuPhim(maPhim)
      .then((result) => {
        setThongTinLichChieuPhim(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [maPhim]);

  console.log(thongTinPhim);
  console.log(thongTinLichChieuPhim);

  return (
    <div>
      <MyHeader />
      <div id="chiTietPhim">
        <div className="myImg">
          <img src={thongTinPhim.hinhAnh} alt="" />
        </div>
        <div>
          <h1>Chi tiet phim</h1>
        </div>
      </div>
    </div>
  );
};

export default ChiTietPhim;

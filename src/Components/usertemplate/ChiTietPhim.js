import React, { useEffect, useState } from "react";
import "./chitietphim.scss";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import ChiTietPhimTabContent from "./ChiTietPhimTabContent";
import { useParams } from "react-router-dom";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import moment from "moment";

import { Tabs } from "antd";

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

  // console.log(thongTinPhim);
  // console.log(thongTinLichChieuPhim.heThongRapChieu);
  const tabChitiet = () => {
    return thongTinLichChieuPhim.heThongRapChieu?.map((item, index) => {
      return {
        key: index,
        label: (
          <img
            style={{ width: " 50px", height: "50px" }}
            src={item.logo}
            alt=""
          />
        ),
        children: <ChiTietPhimTabContent cumRapChieu={item.cumRapChieu} />,
      };
    });
  };
  const tabList = tabChitiet();

  return (
    <div>
      <MyHeader />
      <div id="chiTietPhim">
        <div className="myImg">
          <img src={thongTinPhim.hinhAnh} alt="" />
        </div>
        <div className="thongTinPhim">
          <h1>{thongTinPhim.tenPhim}</h1>
          <h2>Khởi chiếu:</h2>
          <span style={{ color: "green" }}>
            {moment(thongTinPhim.ngayKhoiChieu).format("DD/MM/YYYY")}
          </span>
          <span style={{ color: "red" }}>
            {moment(thongTinPhim.ngayKhoiChieu).format(" ~ hh:mm")}
          </span>{" "}
          <h2>Mô tả:</h2>
          <p>{thongTinPhim.moTa}</p>
        </div>
        <div>
          <Tabs tabPosition="left" items={tabList} />
        </div>
      </div>
      <MyFooter />
    </div>
  );
};

export default ChiTietPhim;

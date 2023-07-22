import React from "react";
import MyHeader from "./MyHeader";
import { Outlet } from "react-router-dom";
import LichChieu from "./LichChieu";
import CumRap from "./CumRap";
import TinTuc from "./TinTuc";
import UngDung from "./UngDung";
import DanhSachPhim from "./DanhSachPhim";

const HomePage = () => {
  return (
    <div id="myMain">
      <MyHeader />
      <Outlet />
      <DanhSachPhim />

      <CumRap />
      <TinTuc />
      <UngDung />
    </div>
  );
};

export default HomePage;

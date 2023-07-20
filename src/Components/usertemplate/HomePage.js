import React from "react";
import MyHeader from "./MyHeader";
import { Outlet } from "react-router-dom";
import LichChieu from "./LichChieu";
import CumRap from "./CumRap";
import TinTuc from "./TinTuc";
import UngDung from "./UngDung";

const HomePage = () => {
  return (
    <>
      <MyHeader />
      <Outlet />
      <LichChieu />
      <CumRap />
      <TinTuc />
      <UngDung />
    </>
  );
};

export default HomePage;

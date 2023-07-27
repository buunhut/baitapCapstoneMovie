import React, { useEffect, useState } from "react";
import MyHeader from "./MyHeader";
import { Outlet, useNavigate } from "react-router-dom";
import CumRap from "./CumRap";
import TinTuc from "./TinTuc";
import UngDung from "./UngDung";
import DanhSachPhim from "./DanhSachPhim";
import { myLocalStore } from "../../redux/myLocalStore";
import MyBanner from "./MyBanner";
import MyFooter from "./MyFooter";

const HomePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = myLocalStore.goiLocalStore("user");
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    if (user.maLoaiNguoiDung === "QuanTri") {
      navigate("/quanly");
    }
  }, [user, navigate]);

  return (
    <div id="myMain">
      <MyHeader />

      <Outlet />
      <MyBanner />
      <DanhSachPhim />

      <CumRap />
      <TinTuc />
      <UngDung />
      <MyFooter />
    </div>
  );
};

export default HomePage;

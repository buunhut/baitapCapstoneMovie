import React, { useEffect, useState } from "react";
import MyHeader from "./MyHeader";
import { Outlet, useNavigate } from "react-router-dom";
import CumRap from "./CumRap";
import TinTuc from "./TinTuc";
import UngDung from "./UngDung";
import DanhSachPhim from "./DanhSachPhim";
import { myLocalStore } from "../../redux/myLocalStore";

const HomePage = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const localUser = myLocalStore.goiLocalStore("user")
    if (localUser) {
      setUser(localUser);

    }
  }, [])

  useEffect(() => {
    // Now, we check the user.maLoaiNguoiDung after setting the user state.
    // This will be triggered after the first useEffect has run and updated the user state.
    if (user.maLoaiNguoiDung === "QuanTri") {
      navigate("/quanly");
    }
  }, [user, navigate]);








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

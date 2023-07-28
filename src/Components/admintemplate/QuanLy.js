import React, { useEffect, useState } from "react";
import "./quanly.scss";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { myLocalStore } from "../../redux/myLocalStore";
import { useDispatch } from "react-redux";
import { dangXuat } from "../../redux/reduxSlice";
import { Button, Popconfirm } from "antd";

const QuanLy = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = myLocalStore.goiLocalStore("user");
    setUser(localUser);

    if (localUser === null) {
      navigate("/dangnhap");
    } else if (localUser.maLoaiNguoiDung === "QuanTri") {
      // Do nothing, the component will be rendered for this case
    } else {
      navigate("/dangnhap");
    }
  }, [navigate]);

  const dispatch = useDispatch();

  //logout
  const handleLogout = () => {
    dispatch(dangXuat());
    myLocalStore.xoaLocalStore("user");

    setUser(null);
    navigate("/dangnhap");
  };

  if (user.maLoaiNguoiDung === "QuanTri") {
    return (
      <div id="quanLy">
        <div id="quanLyMenu">
          <div className="info" style={{ color: "red" }}>
            <p>{user?.taiKhoan}</p>

            <Popconfirm
              placement="top"
              title="Đăng xuất"
              description="Bạn chắc muốn đăng xuất khỏi hệ thống?"
              onConfirm={handleLogout}
              okText="Đăng xuất"
              cancelText="Không"
            >
              <Button id="myButtonDangXuat">
                <i
                  className="fa-solid fa-arrow-right-from-bracket"
                  style={{ color: "white" }}
                ></i>
              </Button>
            </Popconfirm>
          </div>
          <div>
            <ul>
              <li>
                <NavLink to="/quanly/user">
                  <i className="fa-solid fa-user"></i> User
                </NavLink>
              </li>
              <li>
                <NavLink to="/quanly/film">
                  <i className="fa-solid fa-film"></i> Films
                </NavLink>
              </li>
              <li>
                <NavLink to="/quanly/showtime">
                  <i className="fa-solid fa-bomb"></i> Showtimes
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div id="quanLyContent">
          <Outlet />
        </div>
      </div>
    );
  } else {
    // Return null if the user is not 'QuanTri', you can also show a message or a different component.
    return null;
  }
};

export default QuanLy;

import "./myheader.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { myLocalStore } from "../../redux/myLocalStore";
import { dangXuat } from "../../redux/reduxSlice";
import { Button, message, Popconfirm } from "antd";
const text = "Đăng xuất";
const description = "Bạn chắc muốn đăng xuất khỏi hệ thống?";

const MyHeader = () => {
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(dangXuat());
    myLocalStore.xoaLocalStore("user");

    message.info("Đăng xuất thành công.");
  };
  const [display, setDisplay] = useState(true);

  const handleWindowResize = () => {
    // ktra kích thước màn hình và set giá trị cho display
    if (window.innerWidth >= 992) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  useEffect(() => {
    //cập nhật kích thước màn hình
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const showMyMenu = () => {
    setDisplay(!display);
  };
  const duLieu = useSelector((state) => state.duLieu);
  // console.log("redux", duLieu);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("local", user);
  return (
    <div id="myHeader">
      <div className="content">
        <div id="myLogo">
          <h1>CyberMovie</h1>
        </div>
        <div id="myMenu" style={{ height: display ? 300 : 0 }}>
          <div className="myMenuItem">
            <NavLink to="/lichchieu">Lịch Chiếu</NavLink>
          </div>
          <div className="myMenuItem">
            <NavLink to="/cumrap">Cụm Rạp</NavLink>
          </div>
          <div className="myMenuItem">
            <NavLink to="/tintuc">Tin Tức</NavLink>
          </div>
          <div className="myMenuItem">
            <NavLink to="/ungdung">Ứng Dụng</NavLink>
          </div>

          {user !== null ? (
            <div className="dangNhap">
              <div id="userInfo">
                <i className="fa-solid fa-user"></i> {user.taiKhoan}
              </div>
              <div>
                <Popconfirm
                  placement="top"
                  title={text}
                  description={description}
                  onConfirm={confirm}
                  okText="Đăng xuất"
                  cancelText="Không"
                >
                  <Button id="myButtonDangXuat">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ) : (
            <div className="dangNhap">
              <NavLink
                to="/dangnhap"
                onClick={() => {
                  if (window.innerWidth < 992) {
                    showMyMenu();
                  }
                }}
              >
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Đăng nhập
              </NavLink>
            </div>
          )}
        </div>
        <div className="myBar">
          <i className="fa-solid fa-bars" onClick={showMyMenu}></i>
        </div>
      </div>
    </div>
  );
};

export default MyHeader;

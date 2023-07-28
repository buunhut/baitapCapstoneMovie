import "./myheader.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Link } from "react-scroll";
import { myLocalStore } from "../../redux/myLocalStore";
import { dangXuat } from "../../redux/reduxSlice";
import { Button, message, Popconfirm } from "antd";
// const text = "Đăng xuất";
// const description = "Bạn chắc muốn đăng xuất khỏi hệ thống?";

const MyHeader = ({ dangNhap }) => {
  const dispatch = useDispatch();
  const param = useParams();
  // console.log(param.id)

  const confirm = () => {
    dispatch(dangXuat());
    myLocalStore.xoaLocalStore("user");

    message.info("Đăng xuất thành công.");
  };
  const [display, setDisplay] = useState(true);

  const showMyMenu = () => {
    setDisplay(!display);
  };
  const { user } = useSelector((state) => state.duLieu);
  return (
    <>
      <div id="myHeader">
        <div className="content">
          <div id="myLogo">
            <NavLink to="/">
              <h1>CyberMovie</h1>
            </NavLink>
          </div>
          <div id="myMenu" style={{ height: display ? 0 : 300 }}>
            <div id="myMenuContent">
              <div
                className="myMenuItem"
                onClick={() => {
                  if (window.innerWidth < 992) {
                    showMyMenu();
                  }
                }}
              >
                {param.id ? (
                  <NavLink to="/">Lịch Chiếu</NavLink>
                ) : (
                  <Link
                    to="danhSachPhim"
                    smooth={true}
                    duration={500}
                    className="myLink"
                  >
                    Lịch Chiếu
                  </Link>
                )}
              </div>
              <div
                className="myMenuItem"
                onClick={() => {
                  if (window.innerWidth < 992) {
                    showMyMenu();
                  }
                }}
              >
                {param.id ? (
                  <NavLink to="/">Cụm Rạp</NavLink>
                ) : (
                  <Link
                    to="cumRap"
                    smooth={true}
                    duration={500}
                    className="myLink"
                  >
                    Cụm Rạp
                  </Link>
                )}
              </div>
              <div
                className="myMenuItem"
                onClick={() => {
                  if (window.innerWidth < 992) {
                    showMyMenu();
                  }
                }}
              >
                {param.id ? (
                  <NavLink to="/">Tin Tức</NavLink>
                ) : (
                  <Link
                    to="tinTuc"
                    smooth={true}
                    duration={500}
                    className="myLink"
                  >
                    Tin Tức
                  </Link>
                )}
              </div>
              <div
                className="myMenuItem"
                onClick={() => {
                  if (window.innerWidth < 992) {
                    showMyMenu();
                  }
                }}
              >
                {param.id ? (
                  <NavLink to="/">Ứng Dụng</NavLink>
                ) : (
                  <Link
                    to="ungDung"
                    smooth={true}
                    duration={500}
                    className="myLink"
                  >
                    Ứng Dụng
                  </Link>
                )}
              </div>

              {user !== null ? (
                <div className="dangNhap">
                  <div id="userInfo">
                    <i className="fa-solid fa-user"></i> {user.taiKhoan}
                  </div>
                  <div>
                    <Popconfirm
                      placement="top"
                      title="Đăng xuất"
                      description="Bạn chắc muốn đăng xuất khỏi hệ thống?"
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
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth", // Tạo hiệu ứng cuộn mượt
                      });
                      if (window.innerWidth < 992) {
                        showMyMenu();
                      }
                    }}
                  >
                    <i className="fa-solid fa-arrow-right-to-bracket"></i> Đăng
                    nhập
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <div className="myBar">
            <i className="fa-solid fa-bars" onClick={showMyMenu}></i>
          </div>
        </div>
      </div>
      <div className="myOverlay"></div>
    </>
  );
};

export default MyHeader;

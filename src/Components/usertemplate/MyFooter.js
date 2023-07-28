import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./myfooter.scss";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";

const MyFooter = () => {
  const [doiTac, setDoiTac] = useState([]);
  useEffect(() => {
    giaoTiepAPI
      .layThongTinHeThongRap()
      .then((result) => {
        setDoiTac(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div id="myFooter">
      <div className="content">
        <div>
          <h1>
            <NavLink to="/">CyberMovie</NavLink>
          </h1>
          <div>
            <NavLink>Cụm Rạp</NavLink>
          </div>
          <div>
            <NavLink>Lịch Chiếu</NavLink>
          </div>

          <div>
            <NavLink>Tin Tức</NavLink>
          </div>
          <div>
            <NavLink>Ứng Dụng</NavLink>
          </div>
        </div>
        <div className="doiTac">
          <h1>Đối Tác</h1>
          <div className="doiTacContent">
            {doiTac?.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item.logo} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1>Liên Hệ</h1>
          <div>
            <i className="fa-solid fa-location-dot"></i> 112 Cao thắng, phường
            10, Quận 3, Thành phố Hồ Chí Minh Việt Nam
          </div>
          <div>
            <i className="fa-solid fa-phone"></i> 0909 999 999
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFooter;

import React, { useEffect, useState } from "react";
import "./danhsachphim.scss";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
const DanhSachPhim = () => {
  const [danhSachPhim, setDanhSachPhim] = useState([]);
  useEffect(() => {
    giaoTiepAPI
      .layDanhSachPhim()
      .then((result) => {
        setDanhSachPhim(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //   console.log(danhSachPhim);
  return (
    <div id="danhSachPhim">
      <h1>Danh sách phim</h1>
      <div className="danhSachPhimContent">
        {danhSachPhim.map((item, index) => {
          return (
            <div key={index} className="phimItem">
              <div>
                <img src={item.hinhAnh} alt="" />
              </div>
              <div className="phimTitle">
                <h1>C18</h1>
                <p>{item.tenPhim}</p>
              </div>
              <div className="moTa">
                <p>{item.moTa}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DanhSachPhim;

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import "./danhsachphim.scss";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
const DanhSachPhim = () => {
  const [danhSachPhim, setDanhSachPhim] = useState([]);
  useEffect(() => {
    giaoTiepAPI
      .layDanhSachPhim()
      .then((result) => {
        setDanhSachPhim(result.data.content);
        // console.log(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //   console.log(danhSachPhim);
  const chiTietPhim = (maPhim) => {
    //code chi tiết phim
  };
  const [showPopup, setShowPopup] = useState(false);
  const [trailer, setTrailer] = useState("");
  const showTrailer = (trailer) => {
    //code show trailer
    setShowPopup(true);
    setTrailer(trailer);
  };
  const closeTrailer = () => {
    setShowPopup(false);
  };
  return (
    <div id="danhSachPhim">
      <div>
        {/* modal play video */}
        <Modal
          isOpen={showPopup}
          onRequestClose={closeTrailer}
          contentLabel="Video Popup"
          shouldCloseOnOverlayClick={true}
          overlayClassName="custom-overlay"
        >
          {/* Nút đóng popup */}
          <button id="closeTrailer" onClick={closeTrailer}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          {/* Nhúng video từ YouTube */}
          <iframe
            width="100%"
            height="100%"
            src={trailer}
            title="YouTube video player"
            allowFullScreen
          />
        </Modal>
      </div>

      <div className="danhSachPhimContent">
        {danhSachPhim.map((item, index) => {
          return (
            <div key={index} className="phimItem">
              <div className="imgContent">
                <img src={item.hinhAnh} alt="" />
                <h1>C18</h1>
                <div className="imgOverlay">
                  <i
                    className="fa-regular fa-circle-play"
                    onClick={() => showTrailer(item.trailer)}
                  ></i>
                </div>
              </div>
              <div className="phimTitle">
                <h1>{item.tenPhim.toUpperCase()}</h1>
                <div className="moTa">
                  <p className="line-clamp-2">{item.moTa}</p>
                  <div
                    className="datVe"
                    onClick={() => chiTietPhim(item.maPhim)}
                  >
                    <NavLink to={`/chitietphim/${item.maPhim}`}>
                      Chi tiết
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DanhSachPhim;

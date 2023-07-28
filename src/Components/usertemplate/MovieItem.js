import React, { useEffect, useState } from "react";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { Tabs } from "antd";
import "./movieitem.scss";
import moment from "moment";
import { NavLink } from "react-router-dom";

const MovieItem = ({ maHeThongRap }) => {
  const [lichChieu, setLichChieu] = useState([]);
  useEffect(() => {
    giaoTiepAPI.layThongTinLichChieuHeThongRap(maHeThongRap).then((result) => {
      setLichChieu(result.data.content);
    });
  }, [maHeThongRap]);
  // console.log(lichChieu);

  const renderMovieItem = () => {
    return lichChieu[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div
            style={{
              textAlign: "left",
              width: "400px",
            }}
            key={index}
          >
            <p
              style={{
                color: "blueviolet",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {item.tenCumRap}
            </p>
            <p
              style={{
                // color: "silver",
                fontSize: "14px",
              }}
            >
              {item.diaChi}
            </p>
          </div>
        ),
        key: index,
        children: (
          <div id="movieItem" key={index}>
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div key={index} className="movieItemContent">
                    <div className="imgContent">
                      <img src={item.hinhAnh} alt="" />
                    </div>
                    <div className="chiTietLichChieu">
                      <h3>{item.tenPhim}</h3>
                      <div className="suatChieu">
                        {item.lstLichChieuTheoPhim.map((suatChieu, index) => {
                          return (
                            <p key={index}>
                              <NavLink
                                to={`/datvexemphim/${suatChieu.maLichChieu}`}
                              >
                                <span style={{ color: "green" }}>
                                  {moment(suatChieu.ngayKhoiChieu).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                                <span style={{ color: "red" }}>
                                  {moment(suatChieu.ngayKhoiChieu).format(
                                    " ~ hh:mm"
                                  )}
                                </span>{" "}
                              </NavLink>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        ),
      };
    });
  };

  return <Tabs tabPosition="left" items={renderMovieItem()} />;
};

export default MovieItem;

import React, { useEffect, useState } from "react";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { Tabs } from "antd";

const MovieItem = ({ maHeThongRap }) => {
  const [lichChieu, setLichChieu] = useState([]);
  useEffect(() => {
    giaoTiepAPI.layThongTinLichChieuHeThongRap(maHeThongRap).then((result) => {
      setLichChieu(result.data.content);
    });
  }, [maHeThongRap]);
  console.log(lichChieu);

  const renderMovieItem = () => {
    return lichChieu[0]?.lstCumRap.map((item, index) => {
      return {
        label: (
          <div>
            <p>{item.tenCumRap}</p>
            <p>{item.diaChi}</p>
          </div>
        ),
        key: index,
        children: (
          <div>
            {item.danhSachPhim.map((item, index) => {
              if (item.dangChieu) {
                return (
                  <div key={index}>
                    <div>
                      <img src={item.hinhAnh} alt="" />
                    </div>
                    <div>
                      <h3>{item.tenPhim}</h3>
                      <div>
                        {item.lstLichChieuTheoPhim.map((suatChieu, index) => {
                          return (
                            <p key={index}>{suatChieu.ngayChieuGioChieu}</p>
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

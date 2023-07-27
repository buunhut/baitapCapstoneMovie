import { Tabs } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const ChiTietPhimTabContent = ({ cumRapChieu }) => {
  const lichChieuPhim = () => {
    return cumRapChieu?.map((item, index) => {
      return {
        key: index,
        label: (
          <div>
            <p>{item.tenCumRap}</p>
            <p>{item.diaChi}</p>
          </div>
        ),
        children: (
          <div>
            {item.lichChieuPhim.map((item, index) => {
              return (
                <p
                  key={index}
                  style={{
                    width: "150px",
                    border: "1px solid blueviolet",
                    textAlign: "center",
                    borderRadius: "8px",
                  }}
                  className="lichChieu"
                >
                  <NavLink to={`/datvexemphim/${item.maLichChieu}`}>
                    <span style={{ color: "green" }}>
                      {moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")}
                    </span>
                    <span style={{ color: "red" }}>
                      {moment(item.ngayChieuGioChieu).format(" ~ hh:mm")}
                    </span>{" "}
                  </NavLink>
                </p>
              );
            })}
          </div>
        ),
      };
    });
  };

  return <Tabs tabPosition="left" items={lichChieuPhim()} />;
};

export default ChiTietPhimTabContent;

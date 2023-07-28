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
          <div style={{ textAlign: "left" }}>
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
        children: (
          <div>
            {item.lichChieuPhim.map((item, index) => {
              return (
                <p
                  key={index}
                  style={{
                    width: "150px",
                    height: "30px",
                    lineHeight: "30px",
                    border: "1px solid blueviolet",
                    textAlign: "center",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                  className="lichChieu"
                >
                  <NavLink to={`/datvexemphim/${item.maLichChieu}`}>
                    <span style={{ color: "green" }}>
                      {moment(item.ngayChieuGioChieu).format("DD/MM/YYYY")}
                    </span>
                    <span style={{ color: "red" }}>
                      {moment(item.ngayChieuGioChieu).format(" ~ hh:mm")}
                    </span>
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

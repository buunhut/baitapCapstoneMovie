import React from "react";
import "./tintuc.scss";
import { Tabs } from "antd";
import DienAnh24h from "./DienAnh24h";
import SuKien from "./SuKien";
import KhuyenMai from "./KhuyenMai";
const onChange = (key) => {
  // console.log(key);
};
const items = [
  {
    key: "1",
    label: <h1>Điện Ảnh 24h</h1>,
    children: <DienAnh24h />,
  },
  {
    key: "2",
    label: <h1>Sự Kiện</h1>,
    children: <SuKien />,
  },
  {
    key: "3",
    label: <h1>Khuyến Mãi</h1>,
    children: <KhuyenMai />,
  },
];
const TinTuc = () => {
  return (
    <div id="tinTuc">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
    </div>
  );
};

export default TinTuc;

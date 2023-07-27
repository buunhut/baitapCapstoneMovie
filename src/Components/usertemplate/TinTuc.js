import React from "react";
import "./tintuc.scss";
import { Tabs } from "antd";
const onChange = (key) => {
  // console.log(key);
};
const items = [
  {
    key: "1",
    label: `Điện Ảnh 24h`,
    children: `Nội dung tin tức`,
  },
  {
    key: "2",
    label: `Sự Kiện`,
    children: `Nội dung sự kiện`,
  },
  {
    key: "3",
    label: `Khuyến Mãi`,
    children: `Nội dung khuyến mãi`,
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

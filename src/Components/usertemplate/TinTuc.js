import React from "react";
import "./tintuc.scss";
import { Tabs } from "antd";
const onChange = (key) => {
  // console.log(key);
};
const items = [
  {
    key: "1",
    label: `Tin tức`,
    children: `Nội dung tin tức`,
  },
  {
    key: "2",
    label: `Sự kiện`,
    children: `Nội dung sự kiên`,
  },
  {
    key: "3",
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
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

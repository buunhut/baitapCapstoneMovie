import React, { useEffect, useState } from "react";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
import { Tabs } from "antd";
import MovieItem from "./MovieItem";

const CumRap = () => {
  const [heThongRap, setHeThongRap] = useState([]);

  useEffect(() => {
    giaoTiepAPI
      .layThongTinHeThongRap()
      .then((result) => {
        setHeThongRap(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const renderItemTab = () => {
    return heThongRap.map((item, index) => {
      return {
        label: <img src={item.logo} alt="" className="w-10 h-10" />,
        key: index,
        children: <MovieItem maHeThongRap={item.maHeThongRap} />,
      };
    });
  };
  return (
    <div>
      <Tabs tabPosition="left" items={renderItemTab()} />
    </div>
  );
};

export default CumRap;

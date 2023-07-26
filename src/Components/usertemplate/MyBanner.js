import React, { useEffect, useState } from "react";
import "./mybanner.scss";
import { Carousel } from "antd";
import { giaoTiepAPI } from "../../redux/giaoTiepAPI";
// const contentStyle = {
//   margin: "80px",
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

const MyBanner = () => {
  const [myBanner, setMyBanner] = useState([]);

  useEffect(() => {
    giaoTiepAPI
      .laydanhSachBanner()
      .then((rerust) => {
        setMyBanner(rerust.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(myBanner);
  }, []);

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  //   console.log(myBanner);
  return (
    <div id="myBanner">
      <Carousel afterChange={onChange}>
        {myBanner.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.hinhAnh} alt="" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MyBanner;

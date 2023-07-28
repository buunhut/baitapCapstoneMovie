import React from "react";
// import * as LottiePlayer from "@lottiefiles/lottie-player";
import Lottie from "react-lottie";
import * as animation_404 from "../../animation/animation_404.json";
import "./page404.scss";
const Page404 = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation_404,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div id="page404">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Page404;

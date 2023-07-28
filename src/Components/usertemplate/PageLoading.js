import React from "react";
import Lottie from "react-lottie";
import * as loading from "../../animation/loading.json";
import "./pageloading.scss";
const PageLoading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div id="loadingPage">
      <div className="loadingPageContent">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default PageLoading;

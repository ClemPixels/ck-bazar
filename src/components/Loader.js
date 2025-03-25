import React from "react";
import { useNavigation } from "react-router-dom";
// import "../assets/css/style.css";
import { loaderGif } from "../assets";

const Loader = () => {
  const navigation = useNavigation();

  return (
    <>
      {navigation.state === "loading" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          {/* <div className="loader"></div> */}
          <img src={loaderGif} alt="Loading..." />
        </div>
      )}
    </>
  );
};

export default Loader;

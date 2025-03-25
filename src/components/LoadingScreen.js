import React from "react";
import { loaderGif } from "../assets";

const LoadingScreen = () => {
  return (
    <div className="bg-[url('https://media.istockphoto.com/id/2140172947/photo/women-using-laptop-shopping-online-with-cart-icons-with-a-virtual-interface-shipping-global.webp?a=1&b=1&s=612x612&w=0&k=20&c=jQCwwXhrURyiZCGKX58sTPVWA7LfdXCFzphu5vNB2pY=')] bg-cover bg-center h-screen">
      <div className="bg-gray-900 bg-opacity-50 flex justify-center items-center h-screen flex-col">
        <img src={loaderGif} alt="Loading..." />

        <h1 className="text-3xl text-white">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;

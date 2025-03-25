import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const data = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : (prev) => prev - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : (prev) => prev + 1);
  };
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-screen h-[645px] relative">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000 ease-in-out"
        >
          {data.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-screen h-full object-cover"
              alt={`img-${index}`}
              loading="priority"
            />
          ))}
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto bottom-44 flex gap-8">
          <div
            onClick={prevSlide}
            className="w-14 h-14 text-3xl  bg-transparent border-[1px] border-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <IoIosArrowBack />
          </div>
          <div
            onClick={nextSlide}
            className="w-14 h-14 text-3xl  bg-transparent border-[1px] border-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

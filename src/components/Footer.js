import React from "react";
import { paymentImage } from "../assets/index.js";
import { ImGithub } from "react-icons/im";
import { FaTwitter, FaInstagram, FaYoutube, FaHome } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsPaypal } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-black text-[#949494] py-20  font-titleFont">
      <div className="max-w-screen-xl mx-auto grid grid-cols-4">
        {/* =============== LoginIcon Start here =============== */}
        <div className="flex flex-col gap-7">
          <h3 className="text-3xl font-bold">CK Bazzar</h3>
          <p className="text-white text-sm tracking-wide">© ReactBD.com</p>
          <img className="w-56" src={paymentImage} alt="paymentImage" />
          <div className="flex gap-5 text-2xl text-gray-500">
            <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
            <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            <FaHome className="hover:text-white duration-300 cursor-pointer" />
          </div>
        </div>

        {/* =============== LoginIcon Ends here =============== */}
        {/* =============== LocateUs Start here =============== */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">locate Us</h2>
          <div className="text-base flex flex-col gap-2">
            <p>ClemPixels, Clement</p>
            <p>Mobile: +233 531 175 828</p>
            <p>Phone: +233 503 242 386</p>
            <p>Email: clempixels@gmail.com</p>
          </div>
        </div>
        {/* =============== LocateUs Ends here =============== */}
        {/* =============== Profile Start here =============== */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Profile</h2>
          <div className="flex flex-col gap-2 text-base">
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <BsPersonFill />
              </span>
              my account
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <BsPaypal />
              </span>
              checkout
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <FaHome />
              </span>
              order tracking
            </p>
            <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg">
                <MdLocationOn />
              </span>
              help & support
            </p>
          </div>
        </div>
        {/* =============== Profile Ends here =============== */}
        {/* =============== Subscribe Start here =============== */}
        <div className="flex flex-col justify-center ">
          <input
            type="text"
            className="bg-transparent border px-4 py-2 text-sm focus:outline-0"
            placeholder="Enter your email"
          />
          <button className="text-sm border text-white border-t-0 hover:bg-gray-900 active:bg-white active:text-black">
            Subscribe
          </button>
        </div>
        {/* =============== Subscribe Start here =============== */}
      </div>
    </div>
  );
};

export default Footer;

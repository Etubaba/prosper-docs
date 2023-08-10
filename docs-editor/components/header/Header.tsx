import React from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import Avatar from "./Avatar";

const Header = () => {
  return (
    <div className="flex bg-white sticky z-50 top-0 items-center justify-between shadow-sm px-3 md:px-6 py-2">
      <div className="flex space-x-1 md:space-x-3 items-center">
        <AiOutlineMenu className="text-iconcolor text-xl" />

        <img
          className="md:w-10 w-6 h-6 md:h-10"
          alt=""
          src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
        />
        <h1 className="text-iconcolor hidden md:block font-[500] text-2xl">
          Docs
        </h1>
      </div>

      <div className="bg-primarybg w-[40%] md:w-[50%] rounded-lg justify-start items-center flex space-x-3 p-1 md:p-3">
        <AiOutlineSearch className="text-iconcolor text-lg" />
        <input type="text" className="outline-none w-full bg-primarybg" />
      </div>
      <div className=" flex items-center space-x-2 md:space-x-4">
        <CgMenuGridO className="text-iconcolor md:block  text-xl" />
        <Avatar />
        {/* <div className="rounded-full bg-green-600 h-8 w-8 flex items-center justify-center">
          <p className="text-xl text-white">P</p>
        </div> */}
      </div>
    </div>
  );
};

export default Header;

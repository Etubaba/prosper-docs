import React from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";

const HomeHeader = () => {
  return (
    <div className="flex bg-white sticky z-50 top-0 items-center justify-between shadow-sm px-3 md:px-6 py-2">
      <div className="flex space-x-1 md:space-x-3 items-center">
        <AiOutlineMenu className="text-iconcolor text-xl" />

        <img
          className="md:w-10 w-6 h-6 md:h-10"
          alt=""
          src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
        />
        <h1 className="text-iconcolor hidden md:block font-main text-xl">
          Prosper Docs
        </h1>
      </div>
    </div>
  );
};

export default HomeHeader;

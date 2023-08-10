"use client";
import React, { useState } from "react";
import { BsShare } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import { docHeaderType } from "@/interface";
import Avatar from "./Avatar";
import EditTitleModal from "../mydocument/EditTitleModal";
import { AiOutlineSave } from "react-icons/ai";
import { useDocStore, useToggleStore } from "@/store";
import ShareDocModal from "../document/ShareDocModal";

const DocumentHeader = ({
  docProps: { id, title },
}: {
  docProps: docHeaderType;
}) => {
  const showMenu: boolean = useToggleStore((state) => state.showMenu);
  const setShowMenu = useToggleStore((state) => state.handleShowMenu);
  const titleModal: boolean = useToggleStore((state) => state.modal);
  const setTitleModal = useToggleStore((state) => state.handleModal);
  const shareModal = useToggleStore((state) => state.shareModal);
  const setShareModal = useToggleStore((state) => state.handleShareModal);
  const saveDoc = useDocStore((state) => state.handleSaveDoc);

  return (
    <div
      // id="editingHeader"
      className="flex bg-[#F9FBFD]  sticky z-50 top-0  items-center justify-between shadow-sm px-1 md:px-6 py-2"
    >
      <div className="flex space-x-1 md:space-x-3 items-center">
        <Link href={"/document"} className="cursor-pointer">
          <img
            className="md:w-10 w-6 h-6 md:h-10"
            alt=""
            src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
          />
        </Link>
        <div className="flex flex-col">
          <h1 className=" w-fit px-1  md:block font-main text-sm md:text-xl">
            {title}
          </h1>
        </div>
      </div>

      <div className=" flex items-center space-x-2 md:space-x-6">
        <div
          onClick={() => saveDoc(1)}
          className="p-2 hover:bg-gray-300/40 rounded-full flex items-center justify-center"
        >
          <AiOutlineSave className="cursor-pointer text-iconcolor text-2xl" />
        </div>

        <div className="flex space-x-3 justify-center items-center">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="cursor-pointer relative flex items-center space-x-2 hover:bg-gray-300/40 rounded-full p-2"
          >
            <MdOutlineEdit className="text-2xl font-bold text-iconcolor" />

            <IoMdArrowDropdown className="md:block hidden" />
            {showMenu && (
              <div className="absolute rounded-md shadow-lg top-10 right-3 w-44 bg-white p-2 flex flex-col space-y-2">
                <div
                  onClick={() => setTitleModal(true)}
                  className="flex flex-col  hover:bg-primary/5  p-1"
                >
                  <div className="justify-between flex">
                    <div className="flex space-x-2 items-center">
                      {/* <MdOutlineEdit className=" font-bold" /> */}
                      <p className={"text-texttitle font-semibold text-sm"}>
                        Add Title
                      </p>
                    </div>
                  </div>
                  <p className="text-xs  text-textcolor">
                    Create or edit title
                  </p>
                </div>
                <div
                  onClick={() => setTitleModal(true)}
                  className="flex flex-col  hover:bg-primary/5  p-1"
                >
                  <div className="justify-between flex">
                    <div className="flex space-x-2 items-center">
                      {/* <AiOutlineEye className=" font-bold" /> */}
                      <p className={"text-texttitle font-semibold text-sm"}>
                        Description
                      </p>
                    </div>
                  </div>
                  <p className="text-xs  text-textcolor">
                    Add optional description
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          onClick={() => setShareModal(true)}
          className="flex items-center md:p-2 hover:shadow-md space-x-2 rounded-3xl md:px-5 cursor-pointer md:bg-primary/20 md:font-bold "
        >
          <BsShare />
          <p className="text-sm md:block hidden">Share</p>
        </div>
        <Avatar />
      </div>
      <ShareDocModal
        open={shareModal}
        onClose={() => setShareModal(false)}
        id={id}
      />
      <EditTitleModal
        id={id}
        open={titleModal}
        onClose={() => setTitleModal(false)}
      />
    </div>
  );
};

export default DocumentHeader;

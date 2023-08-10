"use client";

import React from "react";
import { bottonProps } from "../../interface";
import Loader from "./Loader";

const Button = ({
  text,
  onClick,
  loading,
  disable,
  type,
  outline,
}: bottonProps): JSX.Element => {
  if (outline)
    return (
      <button
        className=" rounded-md w-full text-sm text-primary px-3 py-2 hover:bg-slate-50 cursor-pointer border border-primary"
        onClick={onClick}
      >
        {text}
      </button>
    );

  return (
    <button
      type="submit"
      disabled={disable}
      onClick={onClick}
      className={`text-center cursor-pointer text-sm px-3 text-white py-2 ${
        disable ? "bg-primary/25" : "bg-primary  hover:bg-primary/70"
      }  ${type === "custom" ? "min-w-[50px]" : "w-full"} rounded-md `}
    >
      {loading ? (
        <div className="justify-center  flex items-center">
          <Loader />
        </div>
      ) : (
        <p>{text}</p>
      )}
    </button>
  );
};

export default Button;

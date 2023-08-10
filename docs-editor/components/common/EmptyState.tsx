import { EmptyStateType } from "@/interface";
import React from "react";

const EmptyState = ({ title, message }: EmptyStateType) => {
  return (
    <div className="bg-white h-44 shadow-md py-4 flex justify-center items-center">
      <div>
        <h2 className="text-texttitle text-center leading-3 mb-2 text-xl ">
          {title}
        </h2>
        <p className="text-textcolor text-center text-sm">{message}</p>
      </div>
    </div>
  );
};

export default EmptyState;

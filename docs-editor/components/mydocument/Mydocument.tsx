import { getTimeAgo } from "@/helper/getTimeAgo";
import { documentType } from "@/interface";
import Link from "next/link";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Mydocument = ({ doc }: { doc: documentType }) => {
  return (
    <Link href={`/document/${doc.id}`}>
      <div className="flex  w-full pb-3 border-b  justify-between items-center mt-6">
        <div className="flex space-x-4 items-center">
          <img
            className=" w-6 h-6"
            alt=""
            src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
          />
          <p className="text-texttitle leading-3">{doc.title}</p>
        </div>
        <div className="flex justify-between md:min-w-[200px] items-center">
          <p className="text-textcolor text-sm">{getTimeAgo(doc.created_at)}</p>
          <BsThreeDotsVertical className="text-iconcolor text-lg" />
        </div>
      </div>
    </Link>
  );
};

export default Mydocument;

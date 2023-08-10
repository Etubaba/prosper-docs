import React from "react";
import CheckEditor from "../../../components/Editor/CheckEditor";
import DocumentHeader from "@/components/header/DocumentHeader";
import { ParamsId, ParamsInterface } from "@/interface";
import { fetchResources } from "@/helper/fetchResources";
import { BASE_URL } from "@/constant";
import { revalidateToken } from "@/helper/revalidateToken";

const page = async ({ params: { id } }: ParamsInterface) => {
  revalidateToken();
  const [docDetails] = await fetchResources([`${BASE_URL}document/${id}`]);

  const headerProps = {
    title: docDetails?.data?.title,
    id,
  };
  return (
    <div className=" ">
      <DocumentHeader docProps={headerProps} />
      <CheckEditor documentId={id} />
    </div>
  );
};

export default page;

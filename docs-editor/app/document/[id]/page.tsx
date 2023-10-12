import OnlineUsers from "@/components/document/OnlineUsers";
import TextEditor from "@/components/document/TextEditor";
import DocumentHeader from "@/components/header/DocumentHeader";
import { BASE_URL } from "@/constant";
import { docPermission } from "@/helper/docPermission";
import { fetchResources } from "@/helper/fetchResources";
import { ParamsInterface } from "@/interface";
import { cookies } from "next/headers";
import React from "react";

async function page({ params: { id } }: ParamsInterface) {
  const cookieStore = cookies();
  const cookie = cookieStore.get("user_id");
  const userId = cookie?.value as string;

  const [docDetails] = await fetchResources([`${BASE_URL}document/${id}`]);

  const headerProps = {
    title: docDetails?.data?.title,
    id,
  };

  //check if user has permission to edit doc

  // docPermission(userId, docDetails?.data?.doc_room);

  return (
    <div className="bg-[#f3f3f3]">
      <DocumentHeader docProps={headerProps} />
      <TextEditor documentId={id} />
      <OnlineUsers />
    </div>
  );
}

export default page;

import EmptyState from "@/components/common/EmptyState";
import Header from "@/components/header/Header";
import CreateDocument from "@/components/mydocument/CreateDocument";
import Mydocument from "@/components/mydocument/Mydocument";
import { BASE_URL } from "@/constant";
import { fetchResources } from "@/helper/fetchResources";
import { ParamsId, documentType } from "@/interface";
import { cookies } from "next/headers";

import React from "react";
import { BsThreeDotsVertical, BsFolderFill } from "react-icons/bs";

const page = async () => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("user_id");
  const id = cookie?.value as string;

  const [userInfo] = await fetchResources([`${BASE_URL}user/${id}`]);

  return (
    <div>
      <Header />
      <section className="bg-primarybg p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex py-3 justify-between items-center">
            <h2 className="text-texttitle text-base">Start a new document</h2>
            <BsThreeDotsVertical className="text-iconcolor text-lg" />
          </div>
          <CreateDocument id={userInfo?.id} />
        </div>
      </section>

      <section className="bg-white p-6">
        <div className="max-w-3xl mx-auto">
          <div className="my-4 flex justify-between items-center">
            <h2 className="text-sm font-main">My documents</h2>

            <div className="flex justify-between md:min-w-[200px]">
              <p className="text-sm text-textcolor">Date Created </p>
              <BsFolderFill className="text-iconcolor" />
            </div>
          </div>

          {userInfo?.documents?.length === 0 ? (
            <EmptyState
              message="Click + to create a new document."
              title="No text documents yet"
            />
          ) : (
            <div>
              {userInfo?.documents?.map((doc: documentType, idx: number) => (
                <Mydocument doc={doc} key={idx} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default page;
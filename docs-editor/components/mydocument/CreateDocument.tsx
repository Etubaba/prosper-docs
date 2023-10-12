"use client";
import { BASE_URL } from "@/constant";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BackDrop from "../common/BackDrop";
import { getCookie } from "cookies-next";

const CreateDocument = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createNewDocument = async () => {
    setLoading(true);
    try {
      const token = getCookie("_t4t5wm");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const { data } = await axios.post(`${BASE_URL}document/create`, {
        user_id: id,
      });
      if (data) {
        router.push(`/document/${data.data.id}`);
        setTimeout(() => setLoading(false), 3000);
      }
    } catch (err: any) {
      setLoading(false);
      alert(`${err.message}`);
    }
  };
  return (
    <div onClick={createNewDocument}>
      <div className="border rounded-sm hover:border-primary cursor-pointer h-48 w-36 ">
        <Image
          height={198}
          width={144}
          className="w-full h-full"
          alt="add-doc"
          // layout="fill"
          src={"/add-doc.png"}
        />
      </div>

      <p className="text-texttitle  font-main mt-2">Blank</p>

      {loading && <BackDrop />}
    </div>
  );
};

export default CreateDocument;

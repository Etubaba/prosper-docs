"use client";
import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { getCookie } from "cookies-next";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { useRouter, usePathname } from "next/navigation";
import { ModalParent } from "@/interface";

const EditTitleModal = ({ open, onClose, id }: ModalParent) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function refreshServer() {
    return router.replace(pathname);
  }

  const updateDocument = async () => {
    setLoading(true);
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";

      const fields: { title?: string; description?: string } = {
        title,
        description,
      };
      title === "" && delete fields.title;
      description === "" && delete fields.description;

      const { data } = await axios.patch(
        `${BASE_URL}document/update/${id}`,
        fields
      );
      if (data) {
        setLoading(false);
        refreshServer();
        onClose();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="md:w-[24rem]  h-auto">
        <p className=" text-center font-semibold md:text-left ">
          Document Information
        </p>
        <div className="border-b my-4" />
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-textColor">Title</p>

          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
          />
        </div>
        <div className="flex flex-col mt-3 space-y-2">
          <p className="text-sm text-textColor">Description (optional)</p>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
          />
        </div>
        <div className="flex justify-between  mt-4">
          <button
            onClick={onClose}
            className="bg-white border hover:bg-slate-50 px-5 py-1.5 rounded-md text-sm font-semibold text-textColor mr-2"
          >
            Cancel
          </button>
          <Button
            disable={title === "" && description === "" ? true : false}
            loading={loading}
            type="custom"
            onClick={updateDocument}
            text={"Update"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditTitleModal;

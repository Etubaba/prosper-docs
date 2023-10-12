import React, { useState } from "react";
import Modal from "../common/Modal";
import { ModalParent } from "@/interface";
import Button from "../common/Button";
import { getCookie } from "cookies-next";
import axios from "axios";
import { BASE_URL } from "@/constant";

const ShareDocModal = ({ open, onClose, id }: ModalParent) => {
  const [targetEmail, setTargetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const shareDocument = async () => {
    setLoading(true);
    try {
      const token = getCookie("_er3434");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      const fields = {
        email: targetEmail,
        documentId: id,
      };
      const { data } = await axios.post(`${BASE_URL}document/share`, fields);
      if (data) {
        setError(false);
        setMsg("Shared Successfully");
        setTargetEmail("");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      setMsg("Something went wrong. Please try again.");
      console.log(err);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="md:w-[24rem] w-[19rem] h-auto">
        <p className=" text-center font-semibold md:text-left ">
          Share to other users
        </p>
        <div className="border-b my-4" />
        <div className="flex flex-col space-y-2">
          <p className="text-sm text-textColor">Email</p>

          <input
            onChange={(e) => setTargetEmail(e.target.value)}
            type="text"
            className="border w-full p-2 form-control rounded-md focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange focus:ring-opacity-5"
          />
        </div>

        {msg !== "" && (
          <p
            className={`text-sm my-3 ${
              error ? "text-red-700" : "text-green-700"
            }`}
          >
            {msg}
          </p>
        )}

        <div className="flex justify-between  mt-4">
          <button
            onClick={onClose}
            className="bg-white border hover:bg-slate-50 px-5 py-1.5 rounded-md text-sm font-semibold text-textColor mr-2"
          >
            Cancel
          </button>
          <Button
            disable={targetEmail === "" ? true : false}
            loading={loading}
            type="custom"
            onClick={shareDocument}
            text={"Share"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShareDocModal;

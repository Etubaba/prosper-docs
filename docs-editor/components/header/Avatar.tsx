"use client";
import { getRandomColor } from "@/helper/randomColor";
import { userProps } from "@/interface";
import { useAuthStore } from "@/store";
import React from "react";

const Avatar = () => {
  const user = useAuthStore((state) => state._grtsjs) as userProps | null;
  return (
    <div
      className={`rounded-full bg-green-700 h-8 w-8 flex items-center justify-center`}
    >
      <p className="text-xl text-white">{user?.user_name[0].toUpperCase()}</p>
    </div>
  );
};

export default Avatar;

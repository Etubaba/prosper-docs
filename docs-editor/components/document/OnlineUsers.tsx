"use client";
import { OnlineUsersType } from "@/interface";
import { useOnlineUsers } from "@/store";
import React from "react";

const OnlineUsers = () => {
  const onlineUsers = useOnlineUsers(
    (state) => state.users
  ) as OnlineUsersType[];

  return (
    <div className="sticky shadow-md bg-white rounded-md  p-2 md:p-3 left-4 md:left-6 bottom-4 w-28 h-32 md:w-36 md:h-44">
      <h2 className="text-title text-xs md:text-sm font-semibold">
        Online Users
      </h2>
      <div className="border-b my-2" />
      <div className="w-full overflow-auto">
        {onlineUsers.map((user) => (
          <div className=" items-center flex space-x-1">
            <div className="bg-green-600 rounded-full p-1"></div>
            <p className="text-textcolor text-xs md:text-sm">
              {user.user_name.charAt(0).toUpperCase() + user.user_name.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineUsers;

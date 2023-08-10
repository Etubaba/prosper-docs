import React, { useRef } from "react";
import { useEffect } from "react";
import { ManagerOptions, SocketOptions, io } from "socket.io-client";

const useSocket = (
  url: string,
  documentId: string,
  user: string | undefined
) => {
  const options: Partial<ManagerOptions & SocketOptions> | undefined = {
    autoConnect: false,
    reconnectionAttempts: 1,
    query: { documentId, user },

    // extraHeaders: {
    //   Authorization: token,
    //   role: role,
    // },
  };

  //   role === undefined && delete options.extraHeaders.role;

  // const socket = io(url)
  const { current: socket } = useRef(io(url, options));
  //connection to socket
  useEffect(() => {
    if (socket.connected) return;
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return socket;
};
export default useSocket;

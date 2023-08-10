"use client";
import React, { useCallback, useState, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import useSocket from "@/hooks/useSocket";
import { BASE_URL, SOCKET_BASE_URL } from "@/constant";
import { OnlineUsersType, cursorPositionType, userProps } from "@/interface";
import QuillCursors from "quill-cursors";
import { getRandomColor } from "@/helper/randomColor";
import {
  useAuthStore,
  useDocStore,
  useOnlineUsers,
  useShareDoc,
} from "@/store";

const SAVE_TIMEOUT_MS = 5000;
const TOOLBAR_SETTINGS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const CURSOR_LATENCY = 1000;

const TEXT_LATENCY = 500;

class ExtendedQuill extends Quill {
  cursors?: QuillCursors;
}

function TextEditor({ documentId }: { documentId: string }) {
  const [quill, setQuill] = useState<ExtendedQuill>();
  const [saveTimeOut, setSaveTimeOut] = useState<number>(0);

  const [cursorInstance, setCursorInstance] = useState<QuillCursors>();

  const user = useAuthStore((state) => state._grtsjs) as userProps | null;
  const handleOnlineUsers = useOnlineUsers((state) => state.handleOnlineUsers);
  const saveDoc: number = useDocStore((state) => state.save);

  //in the case where doc id is shared
  const reSetDocId = useShareDoc((state) => state.storeId);

  const socket = useSocket(
    `${SOCKET_BASE_URL}document`,
    documentId,
    user?.user_name
  );

  console.log("connected?", socket.connected);

  //initialize Quill rich text editor
  Quill.register("modules/cursors", QuillCursors);
  const wrapperRef = useCallback((wrapper: HTMLDivElement | null) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_SETTINGS,
        cursors: {
          // template: '<div class="custom-cursor">+</div>',
          hideDelayMs: 5000,
          hideSpeedMs: 0,
          selectionChangeSource: null,
          transformOnTextChange: true,
        },
      },
    });
    // q.disable();
    q.setText("");

    setQuill(q);
  }, []);

  //listen for document change and update document
  useEffect(() => {
    reSetDocId(undefined);
    if (socket === undefined || quill === null) return;
    const documentUpdateHandler = (delta: any) => {
      quill?.updateContents(delta);
    };

    socket.on("update-document", documentUpdateHandler);
    return () => {
      socket.off("update-document", documentUpdateHandler);
    };
  }, [socket, quill]);

  //listen for cursor position
  useEffect(() => {
    if (socket === undefined || quill === null) return;

    const cursorPositionHandler = (data: any) => {
      const { cursorPosition: position, user_name, user_color } = data;
      console.log("cursor data", data);

      const cursors = quill?.getModule("cursors");

      if (quill && quill?.cursors) {
        const cursorId = `${data.senderSocketId}-${user_name}`; // Generate a unique cursor id

        cursors.createCursor(cursorId, user_name, user_color);

        cursors.moveCursor(cursorId, position);
      }

      quill?.setSelection(position.index, position.length, "user");
    };
    socket.on("cursor-position", cursorPositionHandler);
    return () => {
      socket.off("cursor-position", cursorPositionHandler);
    };
  }, [socket, quill]);

  // load document once on page load
  useEffect(() => {
    if (socket === undefined || quill === null) return;
    socket.emit("load-document", documentId);
    socket.once("document-result", (document) => {
      quill?.setContents(document);
      quill?.enable();
    });
  }, [socket, documentId, quill]);

  // send document data as edited in realtime and cursor position
  useEffect(() => {
    if (socket === undefined || quill === null) return;

    const handleEditDucument = (delta: any, oldDelta: any, source: string) => {
      if (source !== "user") return;
      socket.emit("document-change", {
        documentId,
        delta,
        senderSocketId: socket.id,
      });

      //save document when user isn't typing
      setSaveTimeOut((prev) => prev + 1);
      // const cursorPosition = ;

      // socket.emit("cursor-update", {
      //   documentId,
      //   cursorPosition,
      //   user_name: "malvin",
      // });
    };

    const handleSelectionChange = (
      range: any,
      oldRange: any,
      source: string
    ) => {
      // console.log(quill?.getSelection());
      if (source === "user") {
        console.log("cursor triger");
        socket.emit("cursor-update", {
          documentId,
          cursorPosition: quill?.getSelection(),
          user_name: user?.user_name,
          user_color: getRandomColor(),
          senderSocketId: socket.id,
        });
      }
    };

    quill?.on("selection-change", handleSelectionChange);
    quill?.on("text-change", handleEditDucument);

    return () => {
      quill?.off("text-change", handleEditDucument);
      quill?.off("selection-change", handleSelectionChange);
    };
  }, [socket, quill]);

  //save document on wait
  useEffect(() => {
    if (socket == null || quill == null) return;

    const timeOut = setTimeout(() => {
      socket.emit("save-document", { documentId, data: quill.getContents() });
    }, SAVE_TIMEOUT_MS);

    return () => {
      clearTimeout(timeOut);
    };
  }, [saveTimeOut, saveDoc]);

  //users in room
  useEffect(() => {
    if (!socket) return;

    socket.on("connected-users", (data: OnlineUsersType[]) => {
      handleOnlineUsers(data);
    });
  }, []);

  return <div className="editor" ref={wrapperRef}></div>;
}

export default TextEditor;

"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
import { useEffect, useState } from "react";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
//@ts-ignore
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import MenuBar2 from "./MenuBar2";
import { getRandomColor } from "@/helper/randomColor";
import { SOCKET_BASE_URL } from "@/constant";
import useSocket from "@/hooks/useSocket";
import { useAuthStore, useDocStore } from "@/store";
import { userProps } from "@/interface";

const ydoc = new Y.Doc();

const CheckEditor = ({ documentId }: { documentId: string }) => {
  const [loadedDocument, setLoadedDocument] = useState(null);

  const user = useAuthStore((state) => state._grtsjs) as userProps | null;
  const socket = useSocket(
    `${SOCKET_BASE_URL}document`,
    documentId,
    user?.user_name
  );
  const provder = new WebrtcProvider(documentId, ydoc, {});

  //load document

  useEffect(() => {
    if (editor === null || socket === undefined) return;
    socket.emit("load-document", documentId);

    socket.on("document-result", (doc) => {
      setLoadedDocument(doc?.data);
    });
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provder,
        user: {
          name: user?.user_name, //user name goes here
          color: getRandomColor(),
        },
      }),
    ],
    content: loadedDocument || ``,

    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      console.log(json);
    },
  });

  const saveDoc = useDocStore((state) => state.save);

  //onclick of save doc
  // useEffect(() => {
  //   if (editor === null) return;
  //   const docContent = editor.getJSON();
  //   socket.emit("save-document", { documentId, data: docContent });
  // }, [saveDoc]);

  return (
    <div className=" pt-3">
      <div onKeyDown={(e) => {}} className="md:px-6 px-3 sticky">
        <MenuBar2 editor={editor} />
      </div>

      <div className="flex w-full justify-center items-center">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default CheckEditor;

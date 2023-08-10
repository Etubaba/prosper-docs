import { docRoomType } from "@/interface";
import { redirect } from "next/navigation";

export const docPermission = (userId: string, docRoom: docRoomType) => {
  if (docRoom.owner_id === userId) return;
  else if (docRoom.permitted_users.includes(userId)) return;
  redirect("/document");
};

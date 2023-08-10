import { OnlineUsersType, userProps } from "@/interface";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
//handle user auth and details
const userstore = (set: any) => ({
  _grtsjs: null,
  _xnjdkk: false,
  handleAuthState: (truth: boolean) => {
    set({ _xnjdkk: truth });
  },
  authenticateUser: (user: userProps | null) => {
    set({ _grtsjs: user });
  },
});

//handle saving document
const docStore = (set: any) => ({
  save: 0,
  handleSaveDoc: (num: number) => {
    set({ save: num + 1 });
  },
});

//handle boolean toggles
const toggleStore = (set: any) => ({
  showMenu: false,
  modal: false,
  shareModal: false,
  handleShowMenu: (showMenu: boolean) => {
    set({ showMenu });
  },
  handleModal: (modal: boolean) => {
    set({ modal });
  },
  handleShareModal: (shareModal: boolean) => {
    set({ shareModal });
  },
});

//handle online user
const onlineUserStore = (set: any) => ({
  users: [],
  handleOnlineUsers: (users: OnlineUsersType[]) => {
    set({ users });
  },
});

const sharedDocStore = (set: any) => ({
  documentId: undefined,
  storeId: (documentId: string | undefined) => {
    set({ documentId });
  },
});

export const useShareDoc = create(
  persist(devtools(sharedDocStore), {
    name: "docId",
  })
);
export const useOnlineUsers = create(devtools(onlineUserStore));
export const useDocStore = create(devtools(docStore));
export const useToggleStore = create(devtools(toggleStore));
export const useAuthStore = create(
  persist(devtools(userstore), {
    name: "_tysfjj",
  })
);

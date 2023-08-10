export interface ParamsId {
  id: string;
}
export interface ParamsInterface {
  params: ParamsId;
}

export type EmptyStateType = {
  message: string;
  title: string;
};

export type userProps = {
  id: string;
  user_name: string;
  email: string;
};

export type bottonProps = {
  text: string;
  onClick?: any;
  loading?: boolean;
  type?: string;
  disable?: boolean;
  outline?: boolean;
};

export type cursorPositionType = {
  index: number;
  length: number;
};

export type documentType = {
  id: string;
  owner_id: string;
  description: null | string;
  content: object;
  title: string;
  created_at: string;
  updated_at: string;
};

export type docHeaderType = {
  id: string;
  title: string;
};

export interface ModalType {
  children: React.ReactNode;
  title?: string;
  open: boolean;
  onClose: any;
}

export type ModalParent = {
  open: boolean;
  id: string;
  onClose: any;
};
export interface OnlineUsersType {
  user_name: string;
  socketId: string;
}

export interface docRoomType {
  permitted_users: string[];
  owner_id: String;
}
export interface AuthType {
  password: string;
  email: String;
  user_name?: string;
}

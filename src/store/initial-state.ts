import { IMessageProps } from '../components/atoms/message/index.ts';

export type ProfileInfo = {
  id?: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar?: string;
  email: string;
};

export type ChatInfo = {
  id: number,
  title: string,
  avatar: string,
  created_by: number,
  unread_count: number,
  last_message: {
    user: ProfileInfo;
    time: string;
    content: string;
  } | null,
};

export type MessageInfo = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }  
};

export type ChatUserInfo = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  avatar: string,
  role: string
};

export type StoreState = {
  profile: ProfileInfo | {};
  chats: ChatInfo[] | [];
  activeChat: ChatInfo | {};
  activeChatID: number;
  activeChatMessages: IMessageProps[] | [];
  activeChatUsers: ChatUserInfo[] | [];
};

const initialState: StoreState = {
  profile: {},
  chats: [],
  activeChat: {},
  activeChatID: 0,
  activeChatMessages: [],
  activeChatUsers: [],
};

export default initialState;

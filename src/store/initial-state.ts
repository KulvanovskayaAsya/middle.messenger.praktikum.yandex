import { IMessageProps } from '@components/atoms/message';

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

export type StoreState = {
  profileInfo: ProfileInfo | {};
  chatsList: ChatInfo[] | [];
  activeChatID: number;
  activeChatMessages: IMessageProps[] | [];
};

const initialState: StoreState = {
  profileInfo: {},
  chatsList: [],
  activeChatID: 0,
  activeChatMessages: [],
};

export default initialState;

export type ProfileInfo = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar?: string;
  email: string;
} | {};

export type ChatInfo = {
  id: 3368,
  title: 'test chat 2',
  avatar: null,
  created_by: 285,
  unread_count: 0,
  last_message: null
} | {};

export type StoreState = {
  profileInfo: ProfileInfo;
  chatsList: ChatInfo[];
}

const initialState: StoreState = {
  profileInfo: {},
  chatsList: []
}

export default initialState;

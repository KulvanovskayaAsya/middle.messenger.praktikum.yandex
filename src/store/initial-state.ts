export type ProfileInfo = {
  id: number;
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
  last_message: string
};

export type StoreState = {
  profileInfo: ProfileInfo | {};
  chatsList: ChatInfo[] | [];
}

const initialState: StoreState = {
  profileInfo: {},
  chatsList: []
}

export default initialState;

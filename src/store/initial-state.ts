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

export type StoreState = {
  profileInfo: ProfileInfo;
}

const initialState: StoreState = {
  profileInfo: {}
}

export default initialState;

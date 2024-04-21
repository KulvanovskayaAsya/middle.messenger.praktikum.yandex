import BaseAPI from '@/api/base-api';

const API_BASE_PATH = '/user';

export type ProfileData = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export type PasswordData = {
  oldPassword: string,
  newPassword: string
}

class ProfileAPI extends BaseAPI {
  constructor() {
    super(API_BASE_PATH);
  }

  editProfile(data: Record<string, any>) {
    return this.http.put(`/profile`, { data });
  }

  editAvatar(data: FormData) {
    return this.http.put(`/profile/avatar`, { data });
  }

  editPassword(data: PasswordData) {
    return this.http.put(`/password`, { data });
  }
}

export default ProfileAPI;

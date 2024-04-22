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

  changeProfile(data: Record<string, any>) {
    return this.http.put(`/profile`, { data });
  }

  changeAvatar(avatar: File) {
    const data = new FormData();
    data.append('avatar', avatar);
    return this.http.put(`/profile/avatar`, { data });
  }

  changePassword(data: PasswordData) {
    return this.http.put(`/password`, { data });
  }

  getUserById(userId: string) {
    return this.http.get(`/${userId}`, {});
  }

  searchUser(login: string) {
    return this.http.post(`/search`, {
      data: { login }
    });
  }
}

export default ProfileAPI;

import store from '@/store';
import ProfileAPI from '@/api/profile-api';
import { ProfileInfo } from '@/store/initial-state';

class ProfileService {
  getProfileInfo(): ProfileInfo {
    return store.getState().profile;
  }

  public async changeProfile(data: ProfileInfo) {
    try {
      const profileData = JSON.parse(await ProfileAPI.changeProfile(data) as string);
      
      this._setStoreProfileInfo(profileData);
    } catch (error) {
      alert('Ошибка обновления профиля: ' + error);
    }
  }

  public async changeAvatar(avatarFile: File) {
    try {
      const profileData = await JSON.parse(await ProfileAPI.changeAvatar(avatarFile) as string);

      this._setStoreProfileInfo(profileData);
    } catch (error) {
      alert('Ошибка обновления аватара профиля: ' + error);
    }
  }

  public async changePassword(data: any) {
    try {
      const dataForAPI = {
        oldPassword: data.old_password,
        newPassword: data.new_password,
      };

      await ProfileAPI.changePassword(dataForAPI);
    } catch (error) {
      alert('Ошибка обновления пароля: ' + error);
    }
  }

  private async _setStoreProfileInfo(profileInfo: ProfileInfo) {
    store.setState('profile', {
      ...profileInfo,
    });
  }
}

export default new ProfileService();

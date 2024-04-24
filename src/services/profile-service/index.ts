import store from '@/store';
import ProfileAPI, { ProfileData, PasswordData } from '@/api/profile-api';
import { ProfileInfo } from '@/store/initial-state';

class ProfileService {
  API: ProfileAPI = new ProfileAPI();

  getProfileInfo(): ProfileInfo {
    console.log(store.getState())
    return store.getState();
  }

  public async changeProfile(data: ProfileInfo) {
    try {
      const profileData = JSON.parse(await this.API.changeProfile(data) as string);
      
      this._setStoreProfileInfo(profileData);
    } catch (error) {
      alert('Ошибка обновления профиля: ' + error);
    }
  }

  public async changeAvatar(avatarFile: File) {
    try {
      const profileData = await JSON.parse(await this.API.changeAvatar(avatarFile) as string);

      this._setStoreProfileInfo(profileData);
    } catch (error) {
      alert('Ошибка обновления аватара профиля: ' + error);
    }
  }

  public async changePassword(oldPassword: string, newPassword: string) {
    try {
      const dataForAPI = {
        oldPassword: oldPassword,
        newPassword: newPassword
      };

      await this.API.changePassword(dataForAPI);
    } catch (error) {
      alert('Ошибка обновления пароля: ' + error);
    }
  }

  private async _setStoreProfileInfo(profileInfo: ProfileInfo) {
    store.setState('profileInfo', {
      ...profileInfo
    });
  }
}

export default ProfileService;

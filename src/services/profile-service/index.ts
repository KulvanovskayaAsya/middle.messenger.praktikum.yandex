import store from '@/store';
import ProfileAPI, { ProfileData, PasswordData } from '@/api/profile-api';
import { ProfileInfo } from '@/store/initial-state';

class ProfileService {
  API: ProfileAPI = new ProfileAPI();

  getProfileInfo(): ProfileInfo {
    return store.getState();
  }

  public async editProfile(data: ProfileData) {
    try {
      const response = await this.API.changeProfile(data);
      store.setState('profileInfo', {
        response
      });

      alert("Профиль успешно обновлен");
      return response;
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
      alert("Ошибка обновления профиля: " + error);
      return null;
    }
  }
}

export default ProfileService;

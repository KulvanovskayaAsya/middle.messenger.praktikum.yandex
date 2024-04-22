import store from '@/store';
import ProfileAPI, { ProfileData, PasswordData } from '@/api/profile-api';
import { ProfileInfo } from '@/store/initial-state';

class ProfileService {
  API: ProfileAPI = new ProfileAPI();

  getProfileInfo(): ProfileInfo {
    return store.getState().profileInfo;
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

  // public async editAvatar(data: FormData) {
  //   try {
  //     const response = await this.API.editAvatar(data);
  //     // Обновление аватара в store, предполагая, что API возвращает URL нового аватара
  //     store.set('profileInfo', {
  //       ...store.getState().profileInfo,
  //       avatar: response.data.avatarUrl
  //     });
  //     alert("Аватар успешно обновлен");
  //     return response;
  //   } catch (error) {
  //     console.error("Ошибка обновления аватара:", error);
  //     alert("Ошибка обновления аватара: " + error);
  //     return null;
  //   }
  // }

  // public async editPassword(data: PasswordData) {
  //   try {
  //     const response = await this.API.editPassword(data);
  //     alert("Пароль успешно изменен");
  //     return response;
  //   } catch (error) {
  //     console.error("Ошибка изменения пароля:", error);
  //     alert("Ошибка изменения пароля: " + error);
  //     return null;
  //   }
  // }

  // public async getUserById(userId: string) {
  //   try {
  //     const response = await this.API.getUserById(userId);
  //     return response;
  //   } catch (error) {
  //     console.error("Ошибка получения данных пользователя:", error);
  //     alert("Ошибка получения данных пользователя: " + error);
  //     return null;
  //   }
  // }

  // public async searchUser(login: string) {
  //   try {
  //     const response = await this.API.searchUser(login);
  //     return response;
  //   } catch (error) {
  //     console.error("Ошибка поиска пользователя:", error);
  //     alert("Ошибка поиска пользователя: " + error);
  //     return null;
  //   }
  // }
}

export default ProfileService;

import store from '@/store';
import router from '@/router';
import AuthorizationAPI, { LoginData, RegisterData } from '@/api/authorization-api';

class AuthorizationService {
  API: AuthorizationAPI = new AuthorizationAPI();

  public async signin(data: LoginData) {
    try {
      const response = await this.API.signin(data);
      store.set('profileInfo', {
        ...store.getState().profileInfo,
        response,
      });
      
      router.go('/messenger');
      return response;
    } catch (error) {
      alert("Ошибка входа: " + error);
      return null;
    }
  }

  public async signup(data: RegisterData) {
    try {
      const response = await this.API.signup(data);
      store.set('profileInfo', {
        ...store.getState().profileInfo,
        response,
      });

      router.go('/messenger');
      return response;
    } catch (error) {
      alert("Ошибка регистрации: " + error);
      return null;
    }
  }

  public async getUser() {
    try {
      const response = await this.API.getUser();
      store.set('profileInfo', {
        ...store.getState().profileInfo,
        response,
      });
      return response;
    } catch (error) {
      console.error("Ошибка получения данных пользователя:", error);
      alert("Ошибка получения данных пользователя: " + error);
      return null;
    }
  }

  public async logout() {
    try {
      const response = await this.API.logout();
      store.set('profileInfo', {
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        email: '',
        phone: ''
      });

      router.go('/login');
      return response;
    } catch (error) {
      console.error("Ошибка выхода:", error);
      alert("Ошибка выхода: " + error);
      return null;
    }
  }
}

export default AuthorizationService;

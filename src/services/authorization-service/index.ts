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
      console.log(error)
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
}

export default AuthorizationService;

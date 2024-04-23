import store from '@/store';
import router from '@/router';
import AuthorizationAPI, { SignInData, SignUpData } from '@/api/authorization-api';
import initialState, { ProfileInfo } from '@/store/initial-state';

class AuthorizationService {
  API: AuthorizationAPI = new AuthorizationAPI();

  public async authorize(data: SignInData) {
    try {
      await this.API.signIn(data);

      const profileInfo = await this._getProfileInfo();
      this._setStoreProfileInfo(profileInfo);

      router.go('/messenger');
    } catch (error) {
      alert('Ошибка входа: ' + error);
    }
  }

  public async register(data: SignUpData) {
    try {
      await this.API.signUp(data);

      const profileInfo = await this._getProfileInfo();
      this._setStoreProfileInfo(profileInfo);

      router.go('/messenger');
    } catch (error) {
      alert('Ошибка регистрации: ' + error);
    }
  }

  public async logout() {
    try {
      await this.API.logout();

      this._setStoreProfileInfo(initialState.profileInfo);
      router.go('/login');
    } catch (error) {
      alert('Ошибка выхода: ' + error);
    }
  }

  private async _getProfileInfo() {
    return JSON.parse(await this.API.getUser() as string);
  }

  private async _setStoreProfileInfo(profileInfo: ProfileInfo) {
    store.setState('profileInfo', {
      ...profileInfo
    });
  }
}

export default AuthorizationService;

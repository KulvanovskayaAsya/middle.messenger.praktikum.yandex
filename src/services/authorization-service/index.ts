import store from '../../store/index.ts';
import router from '../../router/index.ts';
import AuthorizationAPI, { SignInData, SignUpData } from '../../api/authorization-api/index.ts';
import initialState, { ProfileInfo } from '../../store/initial-state.ts';

class AuthorizationService {
  private async _getProfileInfo() {
    return JSON.parse(await AuthorizationAPI.getUser() as string);
  }

  private async _setStoreProfileInfo(profileInfo: ProfileInfo | {}) {
    store.setState('profile', {
      ...profileInfo,
    });
  }

  public async updateProfileInfo() {
    try {
      const profileInfo = await this._getProfileInfo();
      this._setStoreProfileInfo(profileInfo);
    } catch (error) {
      throw error;
    }
  }

  public async authorize(data: unknown) {
    try {
      await AuthorizationAPI.signIn(data as SignInData);
      await this.updateProfileInfo();
    } catch (error) {
      alert('Ошибка входа: ' + error);
    }

    router.go('/messenger');
  }

  public async register(data: unknown) {
    try {
      await AuthorizationAPI.signUp(data as SignUpData);
      await this.updateProfileInfo();
    } catch (error) {
      alert('Ошибка регистрации: ' + error);
    }

    router.go('/messenger');
  }

  public async logout() {
    try {
      await AuthorizationAPI.logout();

      this._setStoreProfileInfo(initialState.profile);
    } catch (error) {
      alert('Ошибка выхода: ' + error);
    }
    
    router.go('/login');
  }
}

export default new AuthorizationService();

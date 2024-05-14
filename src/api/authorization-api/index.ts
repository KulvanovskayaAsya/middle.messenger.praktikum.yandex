import BaseAPI from '../base-api/index.ts';

const API_BASE_PATH = '/auth';

export type SignUpData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
};

export type SignInData = {
  login: string
  password: string
};

class AuthorizationAPI extends BaseAPI {
  constructor() {
    super(API_BASE_PATH);
  }

  signIn(data: SignInData) {
    return this.http.post('/signin', { data });
  }

  signUp(data: SignUpData) {
    return this.http.post('/signup', { data });
  }

  getUser() {
    return this.http.get('/user', {});
  }

  logout() {
    return this.http.post('/logout', {});
  }
}

export default new AuthorizationAPI();

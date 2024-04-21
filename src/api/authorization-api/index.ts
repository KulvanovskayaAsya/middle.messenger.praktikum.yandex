import BaseAPI from '@/api/base-api';

const API_BASE_PATH = '/auth';

export type RegisterData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type LoginData = {
  login: string
  password: string
}


class AuthorizationAPI extends BaseAPI {
  constructor() {
    super(API_BASE_PATH);
  }

  signin(data: LoginData) {
    return this.http.post('/signin', { data });
  }

  signup(data: RegisterData) {
    return this.http.post('/signup', { data });
  }

  getUser() {
    return this.http.get('/user', {});
  }

  logout() {
    return this.http.post('/logout', {});
  }
}

export default AuthorizationAPI;

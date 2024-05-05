import LoginPage from '@pages/login';
import RegistrationPage from '@pages/registration';
import ChatPage from '@pages/chat';
import ProfilePage from '@pages/profile';
import ChangePasswordPage from '@pages/change-password';
import ErrorPage404 from '@pages/error404';
import ErrorPage500 from '@pages/error500';
import BaseComponent from '@/utils/base-component';

interface IPageConstructor {
  new(args?: any): BaseComponent;
}

const routes: Record<string, { path: string, component: IPageConstructor }> = {
  'LoginPage': { path: '/', component: LoginPage },
  'RegistrationPage': { path: '/sign-up', component: RegistrationPage },
  'ChatPage': { path: '/messenger', component: ChatPage },
  'ProfilePage': { path: '/settings', component: ProfilePage },
  'ChangePasswordPage': { path: '/change-password', component: ChangePasswordPage },
  'ErrorPage404': { path: '/404', component: ErrorPage404 },
  'ErrorPage500': { path: '/500', component: ErrorPage500 },
};

export default routes;

import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ChatPage from './pages/chat';
import ProfilePage from './pages/profile';
import ChangePasswordPage from './pages/change-password';
import ErrorPage404 from './pages/error404';
import ErrorPage500 from './pages/error500';

interface IPage {
  getContent: () => HTMLElement;
}

interface IPageConstructor {
  new(args?: any): IPage;
}

const pageConstructors: Record<string, IPageConstructor> = {
  loginPage: LoginPage,
  registrationPage: RegistrationPage,
  chatPage: ChatPage,
  profilePage: ProfilePage,
  changePasswordPage: ChangePasswordPage,
  errorPage404: ErrorPage404,
  errorPage500: ErrorPage500,
};

function showPage(pageId: string): void {
  const appElement = document.getElementById('app');
  const PageConstructor = pageConstructors[pageId];

  if (appElement && PageConstructor) {
    const pageInstance = new PageConstructor();
    appElement.innerHTML = '';
    appElement.appendChild(pageInstance.getContent());
  }
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const pageId = target.getAttribute('data-page');

  if (pageId && pageConstructors[pageId]) {
    e.preventDefault();
    showPage(pageId);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  showPage('loginPage');
});

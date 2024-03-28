import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import ChatPage from './pages/chat';

interface IPage {
  getContent: () => HTMLElement;
}

interface IPageConstructor {
  new (): IPage;
}

const pageConstructors: Record<string, IPageConstructor> = {
  loginPage: LoginPage,
  registrationPage: RegistrationPage,
  chatPage: ChatPage,
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

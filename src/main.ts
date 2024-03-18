import Handlebars from 'handlebars';
import * as Atoms from './atoms/index';
import * as Molecules from './molecules/index';
import * as Organisms from './organisms/index';
import * as Pages from './pages/index';

import * as Forms from './utils/mockData';

Object.entries(Forms).forEach(([formName, formData]) => {
  Handlebars.registerHelper(formName, () => formData);
});

Handlebars.registerHelper('inputType', function(type) {
  return new Handlebars.SafeString(type || 'text');
});

[Atoms, Molecules, Organisms, Pages].forEach((componentSet) => {
  Object.entries(componentSet).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
  });
});

function renderPage(pageName: keyof typeof Pages, context: Object) {
  const pageTemplate = Handlebars.compile(Pages[pageName]);
  const html = pageTemplate(context);
  document.body.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderPage('LoginPage', { formFields: Forms.authenticationForm });
});

document.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('data-page');

  if (page) {
    e.preventDefault();
    
		const isErrorPage = page === 'ErrorPage404' || page === 'ErrorPage500';
    const context = getPageContext(page);
		const pageName = isErrorPage ? 'ErrorPage' : page as keyof typeof Pages;
    
    renderPage(pageName, context);
  }
});

function getPageContext(page: string) {
	switch(page) {
		case 'LoginPage': 
			return {
				formFields: Forms.authenticationForm
			};
	
		case 'RegistrationPage':
			return {
				formFields: Forms.registrationForm
			};
		
		case 'ErrorPage404':
			return {
				errorImgSrc: '/images/error404.svg'
			};

		case 'ErrorPage500':
			return {
				errorImgSrc: '/images/error500.svg'
			};

		case 'ProfilePage': 
			return {
				formFields: Forms.profileForm
			};
		
		case 'ChangePasswordPage': 
			return {
				formFields: Forms.changePasswordForm
			};

		default:
			return {};
	}
}

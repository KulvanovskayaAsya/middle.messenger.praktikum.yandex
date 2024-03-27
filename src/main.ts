//@ts-nocheck
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Block from './utils/block';

class Button extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        click: () => console.log('event')
      }
    })
  }

  render() {
    return "<button>{{text}}</button>"
  }
}

class Input extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        change: (e) => props.onChange(e.target.value)
      }
    })
  }

  render() {
      return `<input />`
  }
}

class Page extends Block {
  constructor(props) {
    super({
      ...props,
      button: new Button({text: props.buttonText}),
      input: new Input({
        lable: "input",
        onChange: (value) => {
          this.setProps({buttonText: value})
        }
      }),
    })
  }

  componentDidUpdate(oldProps, newProps) {
      if (oldProps.buttonText !== newProps.buttonText) {
        this.children.button.setProps({ text: newProps.buttonText });
      }
      return true;
  }

  override render() {
      return '<div>{{{ button }}} {{{ input }}}</div>'
  }
}

const block = new Page({buttonText: 'Button'});
const container = document.getElementById('app')!;
console.log(container);
container.append(block.getContent()!);

// import * as Atoms from './components/atoms';
// import * as Molecules from './components/molecules';
// import * as Organisms from './components/organisms';
// import * as Pages from './pages/index';

// import * as Forms from './utils/mock-data';

// Object.entries(Forms).forEach(([formName, formData]) => {
//   Handlebars.registerHelper(formName, () => formData);
// });

// Handlebars.registerHelper('inputType', function(type) {
//   return new Handlebars.SafeString(type || 'text');
// });

// [Atoms, Molecules, Organisms, Pages].forEach((componentSet) => {
//   Object.entries(componentSet).forEach(([name, component]) => {
//     Handlebars.registerPartial(name, component);
//   });
// });

// function renderPage(pageName: keyof typeof Pages, context: Object) {
//   const pageTemplate = Handlebars.compile(Pages[pageName]);
//   const html = pageTemplate(context);
//   document.body.innerHTML = html;
// }

// document.addEventListener('DOMContentLoaded', () => {
//   renderPage('LoginPage', { formFields: Forms.authenticationForm });
// });

// document.addEventListener('click', e => {
//   const target = e.target as HTMLElement;
//   const page = target.getAttribute('data-page');

//   if (page) {
//     e.preventDefault();
    
// 		const isErrorPage = page === 'ErrorPage404' || page === 'ErrorPage500';
//     const context = getPageContext(page);
// 		const pageName = isErrorPage ? 'ErrorPage' : page as keyof typeof Pages;
    
//     renderPage(pageName, context);
//   }
// });

// function getPageContext(page: string) {
// 	switch(page) {
// 		case 'LoginPage': 
// 			return {
// 				formFields: Forms.authenticationForm
// 			};
	
// 		case 'RegistrationPage':
// 			return {
// 				formFields: Forms.registrationForm
// 			};
		
// 		case 'ErrorPage404':
// 			return {
// 				errorImgSrc: '/images/error404.svg'
// 			};

// 		case 'ErrorPage500':
// 			return {
// 				errorImgSrc: '/images/error500.svg'
// 			};

// 		case 'ProfilePage': 
// 			return {
// 				formFields: Forms.profileForm
// 			};
		
// 		case 'ChangePasswordPage': 
// 			return {
// 				formFields: Forms.changePasswordForm
// 			};

// 		default:
// 			return {};
// 	}
// }

import './login.scss';
import template from './login.hbs?raw';

import BaseComponent, { IProps } from '@utils/base-component';
import Form from '@components/organisms/form';
import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import PageTitle from '@components/atoms/page-title';

import { authenticationFormFields } from '@utils/mock-data';
import { withProfile } from '@/store/HOC';
import AuthorizationService from '@services/authorization-service';

interface ILoginPageProps extends IProps {
  modalTitle: PageTitle;
  form: Form;
  registrationLink: Link;
}

const fields = authenticationFormFields.map((field) => new TextField({
  input: {
    id: field.id,
    name: field.name,
    inputType: field.type,
  },
  label: {
    forInputId: field.id,
    label: field.label,
  },
}));

class LoginPage extends BaseComponent {
  loginForm: Form;

  constructor(props: ILoginPageProps) {
    const loginForm = new Form({
      textFields: fields,
      button: new Button({
        text: 'Войти',
        additionalClasses: 'button_primary',
      }),
      events: {
        submit: (event: Event) => this.handleLoginFormSubmit(event),
      },
    });

    super({
      ...props,
      modalTitle: new PageTitle({
        text: 'Вход',
      }),
      form: loginForm,
      registrationLink: new Link({
        text: 'Нет аккаунта?',
        hrefPage: '/sign-up',
      }),
    });

    this.loginForm = loginForm;
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }

  async handleLoginFormSubmit(event: Event) {
    event.preventDefault();
    const loginData = this.loginForm.grabFormValues(this.loginForm);
    
    await AuthorizationService.authorize(loginData);
  }
}

export default withProfile(LoginPage);

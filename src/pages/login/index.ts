import './login.scss';
import template from './login.hbs?raw';
import BaseComponent from '@utils/base-component';
import Form from '@components/organisms/form';
import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import PageTitle from '@components/atoms/page-title';

import { authenticationForm } from '@utils/mock-data';
import AuthorizationService from '@/services/authorization-service';
import connect from '@utils/HOC';

interface ILoginPageProps {
  modalTitle: PageTitle;
  form: Form;
  registrationLink: Link;
}

const fields = authenticationForm.map((field) => new TextField({
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

const submitButton = new Button({
  text: 'Войти',
  additionalClasses: 'button_primary'
});

class LoginPage extends BaseComponent {
  loginForm: Form;
  authService: AuthorizationService = new AuthorizationService();

  constructor(props: ILoginPageProps) {
    const form = new Form({
      textFields: fields,
      button: submitButton,
      events: {
        submit: (event: Event) => this.handleFormSubmit(event),
      }
    });

    super({
      ...props,
      modalTitle: new PageTitle({
        text: 'Вход',
      }),
      form: form,
      registrationLink: new Link({
        text: 'Нет аккаунта?',
        hrefPage: '/sign-up',
      }),
    });

    this.loginForm = form;
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }

  async handleFormSubmit (event: Event) {
    event.preventDefault();
    const loginData = this.loginForm.grabFormValues(this.loginForm);
    
    try {
      const response = await this.authService.signin(loginData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

const mapStateToProps = (state: any) => ({
  profileInfo: state.profileInfo,
});

export default connect(mapStateToProps)(LoginPage);

import './registration.scss';
import template from './registration.hbs?raw';
import BaseComponent from '@utils/base-component';
import Form from '@components/organisms/form';
import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import PageTitle from '@components/atoms/page-title';

import { registrationForm } from '@utils/mock-data';
import AuthorizationService from '@services/authorization-service';
import connect from '@utils/HOC';

interface IRegistrationPageProps {
  modalTitle: PageTitle;
  form: Form;
  loginLink: Link;
}

const fields = registrationForm.map((field) => new TextField({
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
  text: 'Зарегистрироваться',
  hrefPage: '/messanger',
  additionalClasses: 'button_primary',
});

class RegistrationPage extends BaseComponent {
  registrationForm: Form;
  authService: AuthorizationService = new AuthorizationService();

  constructor(props: IRegistrationPageProps) {
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
        text: 'Регистрация',
      }),
      form: form,
      loginLink: new Link({
        hrefPage: '/',
        text: 'Есть аккаунт?'
      }),
    });

    this.registrationForm = form;
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }

  async handleFormSubmit (event: Event) {
    event.preventDefault();
    const registrationData = this.registrationForm.grabFormValues(this.registrationForm);

    console.log(this.registrationForm)
    
    try {
      const response = await this.authService.signup(registrationData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}

const mapStateToProps = (state: any) => ({
  profileInfo: state.profileInfo,
});

export default connect(mapStateToProps)(RegistrationPage);

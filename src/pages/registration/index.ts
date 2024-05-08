import './registration.scss';
import template from './registration.hbs?raw';

import BaseComponent, { IProps } from '@utils/base-component';
import Form from '@components/organisms/form';
import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import PageTitle from '@components/atoms/page-title';

import { registrationFormFields } from '@utils/mock-data';
import { withProfile } from '@/store/HOC';
import AuthorizationService from '@services/authorization-service';

interface IRegistrationPageProps extends IProps {
  modalTitle: PageTitle;
  form: Form;
  loginLink: Link;
}

const fields = registrationFormFields.map((field) => new TextField({
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
  additionalClasses: 'button_primary',
});

class RegistrationPage extends BaseComponent {
  registrationForm: Form;

  constructor(props: IRegistrationPageProps) {
    const form = new Form({
      textFields: fields,
      button: submitButton,
      events: {
        submit: (event: Event) => this.handleFormSubmit(event),
      },
    });

    super({
      ...props,
      modalTitle: new PageTitle({
        text: 'Регистрация',
      }),
      form: form,
      loginLink: new Link({
        hrefPage: '/',
        text: 'Есть аккаунт?',
      }),
    });

    this.registrationForm = form;
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();
    const registrationData = this.registrationForm.grabFormValues(this.registrationForm);
    
    await AuthorizationService.register(registrationData);
  }
}

export default withProfile(RegistrationPage);

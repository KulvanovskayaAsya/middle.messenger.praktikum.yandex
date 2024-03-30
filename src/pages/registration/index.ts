import './registration.scss';
import template from './registration.hbs?raw';
import BaseComponent from '../../utils/base-component';
import Form from '../../components/organisms/form';
import TextField from '../../components/molecules/text-field';
import Button from '../../components/atoms/button';
import Link from '../../components/atoms/link';
import PageTitle from '../../components/atoms/page-title';

import { registrationForm } from '../../utils/mock-data';

interface IRegistrationPageProps {
  modalTitle: PageTitle;
  form: Form;
  loginLink: Link;
}

const fields = registrationForm.map(field => new TextField({
  input: {
    id: field.id,
    name: field.name,
    inputType: field.type
  },
  label: {
    forInputId: field.id,
    label: field.label
  }
}));

const submitButton = new Button({
  text: 'Зарегистрироваться',
  hrefPage: 'chatPage',
  additionalClasses: 'button_primary'
});

class RegistrationPage extends BaseComponent {
  constructor(props: IRegistrationPageProps) {
    super({
      ...props,
      modalTitle: new PageTitle({
        text: 'Регистрация'
      }),
      form: new Form({
        textFields: fields,
        button: submitButton
      }),
      loginLink: new Link({
        hrefLink: '#',
        text: 'Есть аккаунт?',
        hrefPage: 'loginPage'
      })
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default RegistrationPage;

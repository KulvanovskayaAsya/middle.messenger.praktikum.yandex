import './login.scss';
import template from './login.hbs?raw';
import BaseComponent from '../../utils/base-component';
import Form from '../../components/organisms/form';
import TextField from '../../components/molecules/text-field';
import Button from '../../components/atoms/button';
import Link from '../../components/atoms/link';
import PageTitle from '../../components/atoms/page-title';

import { authenticationForm } from '../../utils/mock-data';

interface ILoginPageProps {
  modalTitle: PageTitle;
  form: Form;
  registrationLink: Link;
}

const fields = authenticationForm.map(field => new TextField({
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
  text: 'Войти',
  additionalClasses: 'button_primary',
  hrefPage: 'chatPage'
});

class LoginPage extends BaseComponent {
  constructor(props: ILoginPageProps) {
    super({ 
      ...props,
      modalTitle: new PageTitle({
        text: 'Вход'
      }),
      form: new Form({
        textFields: fields,
        button: submitButton
      }),
      registrationLink: new Link({
        hrefLink: '#',
        text: 'Нет аккаунта?',
        hrefPage: 'registrationPage'
      })
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default LoginPage;

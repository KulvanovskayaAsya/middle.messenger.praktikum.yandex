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
  
}

const fields = authenticationForm.map(field => new TextField({
  input: {
    id: field.id,
    name: field.name,
    inputType: field.type
  },
  label: {
    id: field.id,
    label: field.label
  }
}));

const submitButton = new Button({
  text: 'Войти',
  additionalClasses: 'button_primary',
  hrefPage: 'chatPage',
  onClick: () => {
    console.log('Форма отправлена');
  }
});

class LoginPage extends BaseComponent {
  constructor(props: ILoginPageProps) {
    super({ 
      ...props,
      pageTitle: new PageTitle({
        text: 'Вход'
      }),
      form: new Form({
        textFields: fields,
        button: submitButton
      }),
      link: new Link({
        link: '#',
        text: 'Нет аккаунта?',
        hrefPage: 'registrationPage'
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default LoginPage;

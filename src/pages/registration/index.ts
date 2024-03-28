import './registration.scss'; // Предполагаем, что у вас есть свои стили
import template from './registration.hbs?raw';
import BaseComponent from '../../utils/base-component';
import Form from '../../components/organisms/form';
import TextField from '../../components/molecules/text-field';
import Button from '../../components/atoms/button';
import Link from '../../components/atoms/link';
import PageTitle from '../../components/atoms/page-title';

import { registrationForm } from '../../utils/mock-data';

interface IRegistrationPageProps {
  // Можно добавить свойства, если они потребуются
}

// Определение полей для формы регистрации
const fields = registrationForm.map(field => new TextField({
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
  text: 'Зарегистрироваться',
  hrefPage: 'chatPage',
  additionalClasses: 'button_primary',
  onClick: () => {
    console.log('Форма регистрации отправлена');
  }
});

class RegistrationPage extends BaseComponent {
  constructor(props: IRegistrationPageProps) {
    super({
      ...props,
      pageTitle: new PageTitle({
        text: 'Регистрация'
      }),
      form: new Form({
        textFields: fields,
        button: submitButton
      }),
      link: new Link({
        link: '#',
        text: 'Есть аккаунт?',
        hrefPage: 'loginPage'
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default RegistrationPage;

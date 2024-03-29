import './change-password.scss';
import template from './change-password.hbs?raw';
import BaseComponent from '../../utils/base-component';
import Form from '../../components/organisms/form';
import TextField from '../../components/molecules/text-field';
import Button from '../../components/atoms/button';
import Link from '../../components/atoms/link';
import Avatar from '../../components/atoms/avatar';

import { changePasswordForm } from '../../utils/mock-data';

interface IChangePasswordPageProps {
  
}

const fields = changePasswordForm.map(field => new TextField({
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
  text: 'Сохранить',
  hrefPage: 'chatPage',
  additionalClasses: 'button_primary',
  onClick: () => {
    console.log('Форма отправлена');
  }
});

class ChangePasswordPage extends BaseComponent {
  constructor(props: IChangePasswordPageProps) {
    super({ 
      ...props,
      form: new Form({
        textFields: fields,
        button: submitButton
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChangePasswordPage;

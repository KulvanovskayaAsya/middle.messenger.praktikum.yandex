import './change-password.scss';
import template from './change-password.hbs?raw';
import BaseComponent from '../../utils/base-component';

import TextField from '../../components/molecules/text-field';
import Button from '../../components/atoms/button';
import Link, { ILinkProps } from '../../components/atoms/link';
import Form, { IFormProps } from '../../components/organisms/form';

import { changePasswordForm } from '../../utils/mock-data';

interface IChangePasswordPageProps {
  backLink: ILinkProps,
  form: IFormProps
}

const fields = changePasswordForm.map(field => new TextField({
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
  text: 'Сохранить',
  hrefPage: 'chatPage',
  additionalClasses: 'button_primary'
});

class ChangePasswordPage extends BaseComponent {
  constructor(props: IChangePasswordPageProps) {
    super({ 
      ...props,
      backLink: new Link({
        text: 'Вернуться к профилю',
        hrefLink: '#',
        hrefPage: 'profilePage',
        additionalClasses: 'link_back'
      }),
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

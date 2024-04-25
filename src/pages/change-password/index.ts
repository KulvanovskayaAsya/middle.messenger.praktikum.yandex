import './change-password.scss';
import template from './change-password.hbs?raw';
import BaseComponent from '../../utils/base-component';

import TextField from '../../components/molecules/text-field';
import Button from '../../components/atoms/button';
import Link, { ILinkProps } from '../../components/atoms/link';
import Form, { IFormProps } from '../../components/organisms/form';

import { changePasswordForm } from '../../utils/mock-data';
import ProfileService from '@/services/profile-service';

interface IChangePasswordPageProps {
  backLink: ILinkProps,
  form: IFormProps
}

const fields = changePasswordForm.map((field) => new TextField({
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

class ChangePasswordPage extends BaseComponent {
  changePasswordForm: Form;
  profileService: ProfileService = new ProfileService();

  constructor(props: IChangePasswordPageProps) {
    const form = new Form({
      textFields: fields,
      button: new Button({
        text: 'Сохранить',
        additionalClasses: 'button_primary',
      }),
      events: {
        submit: (event: Event) => this.handleFormSubmit(event),
      }
    });

    super({
      ...props,
      backLink: new Link({
        text: 'Вернуться к профилю',
        hrefPage: '/settings',
        additionalClasses: 'link_back',
      }),
      form: form,
    });

    this.changePasswordForm = form;
  }

  render() {
    return this.compile(template, this.props);
  }

  async handleFormSubmit (event: Event) {
    event.preventDefault();
    const changePasswordData = this.changePasswordForm.grabFormValues(this.changePasswordForm);
    
    await this.profileService.changePassword(changePasswordData);
  }
}

export default ChangePasswordPage;

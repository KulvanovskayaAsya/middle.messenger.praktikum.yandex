import './profile.scss';
import template from './profile.hbs?raw';

import BaseComponent from '@utils/base-component';
import Form from '@components/organisms/form';
import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import Avatar from '@components/atoms/avatar';

import { profileForm } from '@utils/mock-data';

interface IProfilePageProps {

}

const fields = profileForm.map((field) => new TextField({
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
  text: 'Сохранить',
  hrefPage: '/messanger',
  additionalClasses: 'button_primary',
});

class ProfilePage extends BaseComponent {
  constructor(props: IProfilePageProps) {
    super({
      ...props,
      backLink: new Link({
        text: 'Вернуться к чатам',
        hrefPage: '/messanger',
        additionalClasses: 'link_back',
      }),
      avatar: new Avatar({
        src: 'images/avatar.png',
        alt: 'Аватар вашего профиля',
        additionalClasses: 'avatar_large',
      }),
      form: new Form({
        textFields: fields,
        button: submitButton,
      }),
      changePasswordlink: new Link({
        text: 'Изменить пароль',
        hrefPage: '/change-password',
        additionalClasses: 'link_forward profile-form__change-password-link',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;

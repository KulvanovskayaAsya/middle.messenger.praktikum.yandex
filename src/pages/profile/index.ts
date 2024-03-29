import './profile.scss';
import template from './profile.hbs?raw';
import BaseComponent from '../../utils/base-component';
import Form from '../../components/organisms/form';
import TextField from '../../components/molecules/text-field';
import Button from '../../components/atoms/button';
import Link from '../../components/atoms/link';
import Avatar from '../../components/atoms/avatar';

import { profileForm } from '../../utils/mock-data';

interface IProfilePageProps {
  
}

const fields = profileForm.map(field => new TextField({
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

class ProfilePage extends BaseComponent {
  constructor(props: IProfilePageProps) {
    super({ 
      ...props,
      avatar: new Avatar({
        src: 'images/avatar.png',
        additionalClasses: 'avatar_large'
      }),
      form: new Form({
        textFields: fields,
        button: submitButton
      }),
      link: new Link({
        link: '#',
        text: 'Изменить пароль',
        hrefPage: 'changePasswordPage',
        additionalClasses: 'link_forward profile-form__change-password-link'
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;

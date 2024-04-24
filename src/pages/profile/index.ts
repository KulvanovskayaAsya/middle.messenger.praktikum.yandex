import './profile.scss';
import template from './profile.hbs?raw';

import BaseComponent from '@utils/base-component';
import Form from '@components/organisms/form';
import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import Avatar from '@components/atoms/avatar';

import { profileForm } from '@utils/mock-data';
import ProfileService from '@/services/profile-service';
import { withProfile } from '@/store/HOC';
import { ProfileInfo } from '@/store/initial-state';

interface IProfilePageProps {
  backLink: Link;
  avatar: Avatar;
  form: Form;
  changePasswordLink: Link;
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
  additionalClasses: 'button_primary',
});

class ProfilePage extends BaseComponent {
  profileForm: Form;
  profileService: ProfileService = new ProfileService();

  constructor(props: IProfilePageProps) {
    const form = new Form({
      textFields: fields,
      button: submitButton,
      events: {
        submit: (event: Event) => this.handleFormSubmit(event),
      }
    });

    super({
      ...props,
      backLink: new Link({
        text: 'Вернуться к чатам',
        hrefPage: '/messenger',
        additionalClasses: 'link_back',
      }),
      avatar: new Avatar({
        src: 'images/no-avatar.png',
        alt: 'Аватар вашего профиля',
        additionalClasses: 'avatar_large',
      }),
      form: form,
      changePasswordlink: new Link({
        text: 'Изменить пароль',
        hrefPage: '/change-password',
        additionalClasses: 'link_forward profile-form__change-password-link',
      }),
    });

    this.profileForm = form;
    this._fillProfile();
  }

  private _fillProfile() {
    const { profileInfo }: ProfileInfo = this.profileService.getProfileInfo();
  
    // здесь надо проверить, есть ли значение в profileInfo.avatar и, если есть, передать в дочерний компонент Avatar src=profileInfo.avatar

    this.profileForm.setFieldValue('first_name', profileInfo.first_name);
    this.profileForm.setFieldValue('second_name', profileInfo.second_name);
    this.profileForm.setFieldValue('display_name', profileInfo.display_name);
    this.profileForm.setFieldValue('login', profileInfo.login);
    this.profileForm.setFieldValue('email', profileInfo.email);
    this.profileForm.setFieldValue('phone', profileInfo.phone);
  }

  render() {
    return this.compile(template, this.props);
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();
    const profileData = this.profileForm.grabFormValues(this.profileForm);
    console.log(profileData)
    
    await this.profileService.changeProfile(profileData);
  }
}

export default withProfile(ProfilePage);

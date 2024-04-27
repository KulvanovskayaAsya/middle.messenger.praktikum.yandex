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
import Input from '@/components/atoms/input';

interface IProfilePageProps {
  profile: ProfileInfo
}

const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

class ProfilePage extends BaseComponent {
  profileForm: Form;
  profileService: ProfileService = new ProfileService();

  constructor({ profile, ...props}: IProfilePageProps) {
    const profileAvatar = profile.avatar ? `${RESOURCES_BASE_URL}${profile.avatar}` : 'images/no-avatar.png';

    const fields = profileForm.map((field) => new TextField({
      input: {
        id: field.id,
        name: field.name,
        inputType: field.type || 'text',
        value: profile[field.name]
      },
      label: {
        forInputId: field.id,
        label: field.label,
      },
    }));

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

    const uploadAvatarInput = new Input({
      id: 'avatar',
      name: 'avatar',
      inputType: 'file',
      additionalClasses: 'profile-form__upload-avatar',
      events: {
        change: (event: Event) => this.handleAvatarChange(event)
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
        src: profileAvatar,
        alt: 'Аватар вашего профиля',
        additionalClasses: 'avatar_large',
      }),
      uploadAvatarInput: uploadAvatarInput,
      form: form,
      changePasswordlink: new Link({
        text: 'Изменить пароль',
        hrefPage: '/change-password',
        additionalClasses: 'link_forward profile-form__change-password-link',
      }),
    });

    this.profileForm = form;
  }

  render() {
    return this.compile(template, this.props);
  }

  async handleAvatarChange(event: Event) {
    event.preventDefault();

    const avatar = event.target.files[0];
    this.profileService.changeAvatar(avatar);
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();
    const profileData = this.profileForm.grabFormValues(this.profileForm);
    
    await this.profileService.changeProfile(profileData);
  }
}

export default withProfile(ProfilePage);

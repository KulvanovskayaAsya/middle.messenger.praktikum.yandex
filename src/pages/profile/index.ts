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
  profile: ProfileInfo
}

class ProfilePage extends BaseComponent {
  profileForm: Form;
  profileService: ProfileService = new ProfileService();

  constructor({ profile, ...props}: IProfilePageProps) {
    console.log(profile)
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
  }

  render() {
    return this.compile(template, this.props);
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();
    const profileData = this.profileForm.grabFormValues(this.profileForm);
    
    await this.profileService.changeProfile(profileData);
  }
}

export default withProfile(ProfilePage);

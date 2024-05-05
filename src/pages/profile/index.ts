import './profile.scss';
import template from './profile.hbs?raw';

import { BasePage, IProps } from '@utils/base-component';
import Form from '@components/organisms/form';
import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';
import Link from '@components/atoms/link';
import Avatar from '@components/atoms/avatar';

import { profileFormFields } from '@utils/mock-data';
import { withProfile } from '@/store/HOC';
import { ProfileInfo } from '@/store/initial-state';
import Input from '@components/atoms/input';
import profileService from '@services/profile-service';
import { getAvatarUrl } from '@/utils/get-resources-url';

interface IProfilePageProps extends IProps {
  profile: ProfileInfo
}

class ProfilePage extends BasePage {
  profileForm: Form;

  constructor({ profile, ...props }: IProfilePageProps) {
    const fields = profileFormFields.map((field) => new TextField({
      input: {
        id: field.id,
        name: field.name,
        inputType: field.type || 'text',
        value: String(profile[field.name as keyof ProfileInfo]),
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
      },
      dependences: ['profile'],
    });

    const uploadAvatarInput = new Input({
      id: 'avatar',
      name: 'avatar',
      inputType: 'file',
      additionalClasses: 'profile-form__upload-avatar',
      events: {
        change: (event: Event) => this.handleAvatarChange(event),
      },
    });

    super({
      ...props,
      backLink: new Link({
        text: 'Вернуться к чатам',
        hrefPage: '/messenger',
        additionalClasses: 'link_back',
      }),
      avatar: new Avatar({
        src: getAvatarUrl(profile.avatar),
        alt: 'Аватар вашего профиля',
        additionalClasses: 'avatar_large',
        dependences: ['profile'],
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

  public updateChildrenDependentProps(profile: ProfileInfo) {
    const fields = profileFormFields.map((field) => new TextField({
      input: {
        id: field.id,
        name: field.name,
        inputType: field.type || 'text',
        value: String(profile[field.name as keyof ProfileInfo]),
      },
      label: {
        forInputId: field.id,
        label: field.label,
      },
    }));

    const avatar = this.children.avatar;
    const form = this.children.form;

    avatar.setProps({
      ...avatar.props,
      src: getAvatarUrl(profile.avatar),
    });

    form.setProps({
      ...form.props,
      textFields: fields,
    });
  }

  async handleAvatarChange(event: Event) {
    event.preventDefault();

    const input = event.target as HTMLInputElement;
    const avatar = input.files ? input.files[0] : null;
  
    if (avatar) {
      profileService.changeAvatar(avatar);
    }
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();
    const profileData = this.profileForm.grabFormValues(this.profileForm) as unknown as ProfileInfo;
    
    await profileService.changeProfile(profileData);
  }
}

export default withProfile(ProfilePage);

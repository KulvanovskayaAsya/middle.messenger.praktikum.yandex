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
        hrefPage: '/messanger',
        additionalClasses: 'link_back',
      }),
      avatar: new Avatar({
        src: 'images/avatar.png',
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
    this._fillForm();
  }

  private _fillForm() {
    const profileInfo = this.profileService.getProfileInfo();
    console.log(profileInfo);

    this.profileForm.setFieldValue('first_name', 'asya');
  }

  render() {
    return this.compile(template, this.props);
  }

  async handleFormSubmit(event: Event) {
    event.preventDefault();
    const profileData = this.profileForm.grabFormValues(this.profileForm);
    
    try {
      await this.profileService.editProfile(profileData);
    } catch (error) {
      console.error(error);
    }
  }
}

export default withProfile(ProfilePage);

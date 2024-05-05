import BaseComponent, { IProps } from '@utils/base-component';
import './profile-preview.scss';
import template from './profile-preview.hbs?raw';

import Avatar, { IAvatarProps } from '@components/atoms/avatar';
import PageTitle, { IPageTitleProps } from '@components/atoms/page-title';

import Router from '@/router';

export interface IProfilePreviewProps extends IProps {
  profileId?: string | number;
  hrefPage: string;
  avatar: IAvatarProps;
  profileName: IPageTitleProps;
  nickname: string;
}

class ProfilePreview extends BaseComponent {
  constructor(props: IProfilePreviewProps) {
    super({
      ...props,
      avatar: new Avatar({ ...props.avatar }),
      profileName: new PageTitle({ ...props.profileName, additionalClasses: 'profile-preview__real-name' }),
      events: {
        click: () => {
          Router.go(props.hrefPage);
        },
      },
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default ProfilePreview;

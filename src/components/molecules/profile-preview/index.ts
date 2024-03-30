import BaseComponent from '../../../utils/base-component';
import './profile-preview.scss';
import template from './profile-preview.hbs?raw';

import Avatar, { IAvatarProps } from '../../atoms/avatar';
import PageTitle, { IPageTitleProps } from '../../atoms/page-title';

export interface IProfilePreviewProps {
  avatar: IAvatarProps;
  profileName: IPageTitleProps;
  nickname: string;
}

class ProfilePreview extends BaseComponent {
  constructor(props: IProfilePreviewProps) {
    super({
      ...props,
      avatar: new Avatar({ ...props.avatar }),
      profileName: new PageTitle({ ...props.profileName }),
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default ProfilePreview;

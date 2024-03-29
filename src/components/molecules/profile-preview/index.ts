import BaseComponent from '../../../utils/base-component';
import './profile-preview.scss';
import template from './profile-preview.hbs?raw';
import Avatar from '../../atoms/avatar';
import PageTitle from '../../atoms/page-title';

interface IProfilePreview {
}

class ProfilePreview extends BaseComponent {
  constructor(props: IProfilePreview) {
    super({
      ...props,
      avatar: new Avatar ({ ...props.avatar }),
      profileName: new PageTitle({ ...props.profileName })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePreview;

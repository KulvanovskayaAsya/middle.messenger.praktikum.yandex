import BaseComponent from '@utils/base-component';
import './avatar.scss';
import template from './avatar.hbs?raw';

export interface IAvatarProps {
  src: string;
  alt: string;
  additionalClasses?: string;
}

class Avatar extends BaseComponent {
  constructor(props: IAvatarProps) {
    super(props);
  }

  dependsOnProps(): string[] {
    return [];
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Avatar;

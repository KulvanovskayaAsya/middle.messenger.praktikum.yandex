import BaseComponent from '../../../utils/base-component';
import './chat.scss';
import template from './chat.hbs?raw';

import Avatar, { IAvatarProps } from '../../atoms/avatar';

export interface ChatProps {
  avatar: IAvatarProps;
  name: string;
  lastMessage: string;
  unreadedCount: number;
  lastMessageDate: string;
}

class Chat extends BaseComponent {
  constructor(props: ChatProps) {
    super({
      ...props,
      avatar: new Avatar({ ...props.avatar, additionalClasses: 'chat__avatar' }),
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Chat;

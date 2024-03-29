import BaseComponent from '../../../utils/base-component';
import './chat.scss';
import template from './chat.hbs?raw';
import Avatar from '../../atoms/avatar';

type ChatProps = {
  avatar: string,
  name: string,
  lastMessage: string,
  unreadedCount: number,
  date: string
}

class Chat extends BaseComponent {
  constructor(props: ChatProps) {
    super({
      ...props,
      avatar: new Avatar ({ ...props.avatar, additionalClasses: 'chat__avatar' })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Chat;

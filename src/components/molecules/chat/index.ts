import BaseComponent from '../../../utils/base-component';
import './chat.scss';
import template from './chat.hbs?raw'

type ChatProps = {
  avatar: string;
  name: string;
  lastMessage: string;
  unreadedCount: number;
}

class Chat extends BaseComponent {
  constructor(props: ChatProps) {
    super({
      ...props,
      avatar: {
        src: '/images/avatar.png'
      }
    });
  }

  render() {
    this.compile(template, this.props);
  }
}

export default Chat;

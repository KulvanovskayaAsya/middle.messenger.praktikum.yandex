import Block from '../../../utils/block';
import './chat.scss';
import template from './chat.hbs?raw'

type ChatProps = {
  avatar: string;
  name: string;
  lastMessage: string;
  unreadedCount: number;
}

class Chat extends Block {
  constructor(props: ChatProps) {
    super('div', props);
  }

  render(): string {
    return template;
  }
}

export default Chat;

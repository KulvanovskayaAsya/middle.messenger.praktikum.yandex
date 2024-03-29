import BaseComponent from '../../utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import Chat from '../../components/molecules/chat';
import List from '../../components/organisms/list';

import { chatsList } from '../../utils/mock-data';
import ProfilePreview from '../../components/molecules/profile-preview';
interface IChatPageProps {
  
}

const list = chatsList.map(chat => new Chat({
  avatar: chat.avatar,
  name: chat.name,
  lastMessage: chat.lastMessage,
  unreadedCount: chat.unreadedCount,
  date: chat.date
}));

const profilePreview = new ProfilePreview({
  avatar: {
    src: 'images/avatar.png'
  },
  profileName: {
    text: 'Кульвановская Ася'
  },
  nickname: '@tychka'
});

class ChatPage extends BaseComponent {
  constructor(props: IChatPageProps) {
    super({
      ...props,
      profilePreview: profilePreview,
      list: new List({
        list
      })
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatPage;

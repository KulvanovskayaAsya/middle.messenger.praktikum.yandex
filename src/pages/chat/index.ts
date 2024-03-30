import BaseComponent from '../../utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import Chat from '../../components/molecules/chat';
import List from '../../components/organisms/list';
import ProfilePreview from '../../components/molecules/profile-preview';
import TextField from '../../components/molecules/text-field';

import { chatsList } from '../../utils/mock-data';

interface IChatPageProps {
  profilePreview: ProfilePreview;
  searchBox: TextField;
  chatsList: List;
  messagesList?: List;
}

const list = chatsList.map((chat) => new Chat({
  avatar: chat.avatar,
  name: chat.name,
  lastMessage: chat.lastMessage,
  unreadedCount: chat.unreadedCount,
  lastMessageDate: chat.date,
}));

const profilePreview = new ProfilePreview({
  avatar: {
    src: 'images/avatar.png',
    alt: 'Аватар пользователя Кульвановской Аси',
  },
  profileName: {
    text: 'Кульвановская Ася',
  },
  nickname: '@tychka',
});

class ChatPage extends BaseComponent {
  constructor(props: IChatPageProps) {
    super({
      ...props,
      profilePreview,
      searchBox: new TextField({
        input: {
          id: 'searchBox',
          name: 'search',
        },
        label: {
          forInputId: 'searchBox',
          label: 'Искать...',
        },
      }),
      chatsList: new List({ list }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatPage;

import BaseComponent from '../../utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import Message from '../../components/atoms/message';
import Button from '../../components/atoms/button';
import Chat from '../../components/molecules/chat';
import List from '../../components/organisms/list';
import ProfilePreview from '../../components/molecules/profile-preview';
import TextField from '../../components/molecules/text-field';

import { chatsList, messagesList } from '../../utils/mock-data';
import ChatService from '@/services/chat-service';
import { ChatInfo } from '@/store/initial-state';

interface IChatPageProps {
  profilePreview: ProfilePreview;
  searchBox: TextField;
  chatsList?: List;
  messagesList?: List;
  sendButtn: Button;
}

const chats = chatsList.map((chat) => new Chat({
  avatar: chat.avatar,
  name: chat.name,
  lastMessage: chat.lastMessage,
  unreadedCount: chat.unreadedCount,
  lastMessageDate: chat.date,
}));

const messages = messagesList.map((message) => new Message({
  text: message.text,
  date: message.date,
}));

const profilePreview = new ProfilePreview({
  avatar: {
    src: 'images/no-avatar.png',
    alt: 'Аватар пользователя Кульвановской Аси',
  },
  profileName: {
    text: 'Кульвановская Ася',
  },
  nickname: '@tychka',
  hrefPage: '/settings'
});

class ChatPage extends BaseComponent {
  chatService: ChatService = new ChatService();

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
      chatsList: new List({ list: chats }),
      messagesList: new List({ list: messages }),
      messageInput: new TextField({
        input: {
          id: 'messageBox',
          name: 'message',
        },
        label: {
          forInputId: 'messageBox',
          label: 'Сообщение...',
        },
        additionalClasses: 'messenger__message-input',
      }),
    });

    this._fillChats();
  }

  private async _fillChats() {
    const chatsList: ChatInfo[] = await this.chatService.getChatsList();
    console.log(chatsList)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatPage;

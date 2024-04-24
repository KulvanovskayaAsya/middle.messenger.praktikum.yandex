import BaseComponent from '../../utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import Message from '@components/atoms/message';
import Button from '@components/atoms/button';
import Chat from '@components/molecules/chat';
import List from '@components/organisms/list';
import ProfilePreview from '@components/molecules/profile-preview';
import TextField from '@components/molecules/text-field';

import { chatsList, messagesList, profileForm } from '@utils/mock-data';
import ChatService from '@/services/chat-service';
import { ChatInfo } from '@/store/initial-state';
import ProfileService from '@/services/profile-service';
import { withProfile } from '@/store/HOC';

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

const profileService = new ProfileService();

class ChatPage extends BaseComponent {
  chatService: ChatService = new ChatService();
  profileService: ProfileService = new ProfileService();

  chatsList: any[] = [];

  constructor(props: IChatPageProps) {
    super({
      ...props,
      profilePreview: new ProfilePreview({
        avatar: {
          src: 'images/no-avatar.png',
          alt: 'Аватар пользователя Кульвановской Аси',
        },
        profileName: {
          text: 'Кульвановская Ася',
        },
        nickname: profileService.getProfileInfo().profileInfo.display_name,
        hrefPage: '/settings'
      }),
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
      chatsList: new List({ list: [] }), //new List({ list: chats })
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
    this.chatsList = chatsList;

    console.log(this.chatsList)

    this.setProps({ 
      messagesList: new List({ list: this.chatsList }) 
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withProfile(ChatPage);

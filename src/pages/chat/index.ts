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

const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

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
const chatService = new ChatService();

class ChatPage extends BaseComponent {
  constructor(props: IChatPageProps) {
    const profileInfo = profileService.getProfileInfo();
    const chatsList = chatService.getChatsList();

    console.log(chatsList)

    const profileAvatar = profileInfo.avatar ? `${RESOURCES_BASE_URL}${profileInfo.avatar}` : 'images/no-avatar.png';

    super({
      ...props,
      profilePreview: new ProfilePreview({
        avatar: {
          src: profileAvatar,
          alt: `Аватар пользователя ${profileInfo.display_name}`,
        },
        profileName: {
          text: `${profileInfo.first_name} ${profileInfo.second_name}`,
        },
        nickname: profileInfo.display_name,
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
      chatsList: new List({ list: chatsList }), //new List({ list: chats })
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
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withProfile(ChatPage);

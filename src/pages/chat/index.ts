import BaseComponent from '../../utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import Message from '@components/atoms/message';
import Chat from '@components/molecules/chat';
import List from '@components/organisms/list';
import ProfilePreview from '@components/molecules/profile-preview';
import TextField from '@components/molecules/text-field';

import { messagesList } from '@utils/mock-data';
import ChatService from '@/services/chat-service';
import { ChatInfo, ProfileInfo } from '@/store/initial-state';
import ProfileService from '@/services/profile-service';
import { withChats } from '@/store/HOC';

interface IChatPageProps {
  profile: ProfileInfo,
  chats: ChatInfo[]
}

const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

const messages = messagesList.map((message) => new Message({
  text: message.text,
  date: message.date,
}));

class ChatPage extends BaseComponent {
  profileService: ProfileService = new ProfileService();
  chatService: ChatService = new ChatService();

  constructor({ profile, chats, ...props }: IChatPageProps) {
    console.log('ChatPage ', chats)
    const profileAvatar = profile.avatar ? `${RESOURCES_BASE_URL}${profile.avatar}` : 'images/no-avatar.png';

    console.log(chats)

    super({
      ...props,
      profilePreview: new ProfilePreview({
        avatar: {
          src: profileAvatar,
          alt: `Аватар пользователя ${profile.display_name}`,
        },
        profileName: {
          text: `${profile.first_name} ${profile.second_name}`,
        },
        nickname: profile.display_name,
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

      chatsList: new List({ 
        list: chats.map((chat) => new Chat({
          avatar: {
            src: chat.avatar ? `${RESOURCES_BASE_URL}${chat.avatar}` : 'images/no-avatar.png',
            alt: `Аватар чата ${chat.title}`
          },
          name: chat.title,
          lastMessage: chat.last_message || 'Нет сообщений',
          unreadedCount: chat.unread_count
        }))
      }),
      // // messagesList: new List({ list: messages }),
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
    console.log('ChatPage render = ', this.props, this.children)
    return this.compile(template, this.props);
  }
}

export default withChats(ChatPage);

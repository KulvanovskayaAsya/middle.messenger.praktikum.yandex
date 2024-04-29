import BaseComponent from '../../utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import Message from '@components/atoms/message';
import Chat from '@components/molecules/chat';
import List, { IListFactory } from '@components/organisms/list';
import ProfilePreview from '@components/molecules/profile-preview';
import TextField from '@components/molecules/text-field';

import { messagesList } from '@utils/mock-data';
import ChatService from '@/services/chat-service';
import { ChatInfo, ProfileInfo } from '@/store/initial-state';
import ProfileService from '@/services/profile-service';
import { withChats } from '@/store/HOC';

interface IChatPageProps {
  profile: ProfileInfo;
  chats: ChatInfo[];
}

const RESOURCES_BASE_URL = 'https://ya-praktikum.tech/api/v2/resources';

const messages = messagesList.map((message) => new Message({
  text: message.text,
  date: message.date,
}));

export class ChatListFactory implements IListFactory {
  getListItemComponent(props: unknown): BaseComponent {
    return new Chat({
      avatar: {
        src: props.avatar ? `${RESOURCES_BASE_URL}${props.avatar}` : 'images/no-avatar.png',
        alt: `Аватар чата ${props.title}`
      },
      name: props.title,
      lastMessage: props.last_message || 'Нет сообщений',
      unreadedCount: props.unread_count
    });
  }
}

class ChatPage extends BaseComponent {
  profileService: ProfileService = new ProfileService();
  chatService: ChatService = new ChatService();

  constructor({ profile, chats, ...props }: IChatPageProps) {
    const profileAvatar = profile.avatar ? `${RESOURCES_BASE_URL}${profile.avatar}` : 'images/no-avatar.png';

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
        list: chats,
        dependences: ['chats']
      }, new ChatListFactory()),
      // messagesList: new List({ list: messages }),
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

export default withChats(ChatPage);

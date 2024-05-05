import BaseComponent, { BasePage, IProps } from '@utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import Message, { IMessageProps } from '@components/atoms/message';
import Chat from '@components/molecules/chat';
import List, { IListFactory } from '@components/organisms/list';
import ProfilePreview from '@components/molecules/profile-preview';
import TextField from '@components/molecules/text-field';

import { ChatInfo, MessageInfo, ProfileInfo } from '@/store/initial-state';
import { withChats } from '@/store/HOC';
import Button from '@components/atoms/button';
import Form from '@components/organisms/form';
import ChatService from '@services/chat-service';
import store from '@/store';
import { getAvatarUrl } from '@/utils/get-resources-url';

interface IChatPageProps extends IProps {
  profile: ProfileInfo;
  chats: ChatInfo[];
  activeChatID: number;
  activeChatMessages: IMessageProps[] | [];
}

export class ChatListFactory implements IListFactory {
  getListItemComponent(props: ChatInfo): BaseComponent {
    return new Chat({
      id: props.id,
      avatar: {
        src: getAvatarUrl(props.avatar),
        alt: `Аватар чата ${props.title}`,
      },
      name: props.title,
      lastMessage: props.last_message?.content || 'Нет сообщений',
      unreadedCount: props.unread_count,
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;

          const chatsElements = document.querySelectorAll('.chat');
          chatsElements.forEach((chatElement) => chatElement.classList.remove('chat_active'));

          const activeChat = target.closest('.chat') as HTMLElement;
          activeChat.classList.add('chat_active');

          const activeChatID = Number(activeChat.getAttribute('data-chat-id'));
          
          ChatService.setActiveChat(activeChatID);
        },
      },
    });
  }
}

export class MessageFactory implements IListFactory {
  getListItemComponent(props: MessageInfo): BaseComponent {
    if (props.user_id === store.getState().profileInfo.id) {
      return new Message({
        text: props.content,
        date: props.time,
        additionalClasses: 'message_mine',
      });
    } else {
      return new Message({
        text: props.content,
        date: props.time,
      });
    }
  }
}

class ChatPage extends BasePage {
  messageForm: Form;

  addChatForm: Form;

  constructor({ profile, chats, activeChatID, activeChatMessages, ...props }: IChatPageProps) {
    const messageSendForm = new Form({
      textFields: [ new TextField({
        input: {
          id: 'messageBox',
          name: 'message',
        },
        label: {
          forInputId: 'messageBox',
          label: 'Сообщение...',
        },
        additionalClasses: 'messenger__message-input',
      })],
      button: new Button({
        icon: 'icons/sendIcon.svg',
        additionalClasses: 'button_with-icon messenger__send-button',
      }),
      events: {
        submit: (event: Event) => this.handleMessageSend(event),
      },
    });

    const addChatForm = new Form({
      textFields: [ 
        new TextField({
          input: {
            id: 'chatTitle',
            name: 'chatTitle',
          },
          label: {
            forInputId: 'chatTitle',
            label: 'Название чата',
          },
        }),
        new TextField({
          input: {
            id: 'userId',
            name: 'chatUser',
          },
          label: {
            forInputId: 'userId',
            label: 'ID пользователя',
          },
        }),
      ],
      button: new Button({
        text: 'Создать чат',
        additionalClasses: 'button_primary',
      }),
      events: {
        submit: (event: Event) => this.handleChatCreation(event),
      },
    });

    super({
      ...props,
      profilePreview: new ProfilePreview({
        avatar: {
          src: getAvatarUrl(profile.avatar),
          alt: `Аватар пользователя ${profile.display_name}`,
        },
        profileName: {
          text: `${profile.first_name} ${profile.second_name}`,
        },
        nickname: profile.display_name,
        profileId: profile.id,
        hrefPage: '/settings',
        dependences: ['profile'],
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
        additionalClasses: 'manage-chats__search-chat',
      }),
      addChatButton: new Button({
        icon: 'icons/addChat.svg',
        additionalClasses: 'button_with-icon manage-chats__add-chat',
        events: {
          mousedown: () => {
            const modal = document.querySelector('.modal');
            modal?.classList.add('open');
          },
        },
      }),
      chatsList: new List({
        list: chats,
        dependences: ['chats'],
      }, new ChatListFactory()),
      messagesList: new List({ 
        list: activeChatMessages,
        dependences: ['activeChatMessages'],
      }, new MessageFactory()),
      messageSendForm: messageSendForm,
      addChatForm: addChatForm,
    });

    this.messageForm = messageSendForm;
    this.addChatForm = addChatForm;

    ChatService.getChatsList();
  }

  render() {
    return this.compile(template, this.props);
  }

  public handleChatCreation(event: Event) {
    event.preventDefault();

    const newChatData = this.addChatForm.grabFormValues(this.addChatForm);
    ChatService.createChat(newChatData);
  }

  public updateChildrenDependentProps(newProps: ProfileInfo | ChatInfo[] | IMessageProps[], dependence: string) {
    if (dependence === 'chats') {
      const chats = newProps as ChatInfo[];
      const chatsList = this.children.chatsList;

      chatsList.setProps({
        ...chatsList.props,
        list: chats,
      });
    } else if (dependence === 'profile') {
      const profileInfo = newProps as ProfileInfo; 
      const profilePreview = this.children.profilePreview;
      const profilePreviewAvatar = profilePreview.children.avatar;
      const profilePreviewName = profilePreview.children.profileName;

      profilePreview.setProps({
        nickname: profileInfo.display_name,
        profileId: profileInfo.id,
      });

      profilePreviewAvatar.setProps({
        ...profilePreviewAvatar.props,
        src: getAvatarUrl(profileInfo.avatar),
        alt: `Аватар пользователя ${profileInfo.display_name}`,
      });

      profilePreviewName.setProps({
        ...profilePreviewName.props,
        text: `${profileInfo.first_name} ${profileInfo.second_name}`,
      });
    } else if (dependence === 'activeChatMessages') {
      const messages = newProps as IMessageProps[];
      const messagesList = this.children.messagesList;

      messagesList.setProps({
        ...messagesList.props,
        list: messages,
      });
    }
  }

  public handleMessageSend(event: Event) {
    event.preventDefault();

    const messageData = this.messageForm.grabFormValues(this.messageForm);

    ChatService.sendMessage(messageData.message);
  }
}

export default withChats(ChatPage);

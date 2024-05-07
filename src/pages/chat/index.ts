import BaseComponent, { IProps, IUpdatable } from '@utils/base-component';
import template from './chat.hbs?raw';
import './chat.scss';

import { IMessageProps } from '@components/atoms/message';
import List from '@components/organisms/list';
import ProfilePreview from '@components/molecules/profile-preview';
import TextField from '@components/molecules/text-field';

import { ChatInfo, ChatUserInfo, ProfileInfo } from '@/store/initial-state';
import { withChats } from '@/store/HOC';
import Button from '@components/atoms/button';
import Form from '@components/organisms/form';
import ChatService from '@services/chat-service';
import { getAvatarUrl } from '@/utils/get-resources-url';
import Input from '@/components/atoms/input';
import Avatar from '@/components/atoms/avatar';
import ChatUsersListFactory from '@/utils/list-factories/chat-users-list';
import ChatsListFactory from '@/utils/list-factories/chat-list';
import MessagesListFactory from '@/utils/list-factories/messages-list';
import { isEmptyObject, isPlainObject } from '@/utils/type-check';

interface IChatPageProps extends IProps {
  profile: ProfileInfo;
  chats: ChatInfo[];
  activeChat: ChatInfo;
  activeChatID: number;
  activeChatMessages: IMessageProps[] | [];
  activeChatUsers: ChatUserInfo[];
}

type AddUserFormData = {
  chatUser: string;
};

type SendMessageFormData = {
  message: string;
};

class ChatPage extends BaseComponent implements IUpdatable {
  messageForm: Form;

  addChatForm: Form;

  addUserForm: Form;

  constructor({ profile, chats, activeChat, activeChatID, activeChatMessages, activeChatUsers, ...props }: IChatPageProps) {
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

    const addChatUserForm = new Form({
      textFields: [
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
        text: 'Добавить пользователя',
        additionalClasses: 'button_primary',
      }),
      events: {
        submit: (event: Event) => this.handleUserAdding(event),
      },
    });

    const uploadChatAvatarInput = new Input({
      id: 'avatar',
      name: 'avatar',
      inputType: 'file',
      additionalClasses: 'profile-form__upload-avatar',
      events: {
        change: (event: Event) => this.handleAvatarChange(event),
      },
    });

    super({
      ...props,
      isChatUserCreation: false,
      chatInfo: new ProfilePreview({
        avatar: {
          src: getAvatarUrl(activeChat.avatar),
          alt: `Аватар чата ${activeChat.title}`,
        },
        profileName: {
          text: `${activeChat.title}`,
        },
        profileId: activeChat.id,
        dependences: ['activeChat'],
      }),
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
      }, new ChatsListFactory()),
      messagesList: new List({ 
        list: activeChatMessages,
        dependences: ['activeChatMessages'],
      }, new MessagesListFactory()),
      messageSendForm: messageSendForm,
      addChatForm: addChatForm,
      addChatUserForm: addChatUserForm,
      chatAvatar: new Avatar({
        src: getAvatarUrl(activeChat.avatar),
        alt: 'Аватар чата',
        additionalClasses: 'avatar_large',
        dependences: ['activeChat'],
      }),
      uploadChatAvatarInput: uploadChatAvatarInput,
      addUserButton: new Button({
        text: 'Добавить пользователя',
        icon: 'icons/addUser.svg',
        additionalClasses: 'button_secondary',
        events: {
          mousedown: () => {
            const modal = document.querySelector('.modal');
            modal?.classList.add('open');
            this._createAddUserForm();
          },
        },
      }),
      usersList: new List({
        list: activeChatUsers,
        dependences: ['activeChatUsers'],
      }, new ChatUsersListFactory()),
      showChatDetailsButton: new Button({
        icon: 'icons/moreAboutChat.svg',
        additionalClasses: 'button_with-icon chat-info__show-details',
        events: {
          mousedown: () => this._showChatDetails(),
        },
      }),
    });

    this.messageForm = messageSendForm;
    this.addChatForm = addChatForm;
    this.addUserForm = addChatUserForm;

    ChatService.getChatsList();
  }

  private _createAddUserForm() {
    this.setProps({
      ...this.props,
      isChatUserCreation: true,
    });
  }

  private _showChatDetails() {
    document.querySelector('.chat-info_details')?.classList.remove('hidden');
  }

  public render() {
    return this.compile(template, this.props);
  }

  async handleAvatarChange(event: Event) {
    event.preventDefault();

    const input = event.target as HTMLInputElement;
    const avatar = input.files ? input.files[0] : null;
  
    if (avatar) {
      ChatService.changeActiveChatAvatar(avatar);
    }
  }

  public handleChatCreation(event: Event) {
    event.preventDefault();

    const newChatData = this.addChatForm.grabFormValues(this.addChatForm);
    ChatService.createChat(newChatData);
  }

  public handleUserAdding(event: Event) {
    event.preventDefault();

    const newUserData = this.addUserForm.grabFormValues(this.addUserForm) as AddUserFormData;
    ChatService.addUserToActiveChat(newUserData.chatUser);
  }

  public handleMessageSend(event: Event) {
    event.preventDefault();

    const messageData = this.messageForm.grabFormValues(this.messageForm) as SendMessageFormData;
    if (messageData.hasOwnProperty('message'))
      ChatService.sendMessage(messageData.message);
  }

  public updateChildrenDependentProps(newProps: ProfileInfo | ChatInfo | ChatInfo[] | IMessageProps[] | ChatUserInfo[], dependence: string) {
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
    } else if (dependence === 'activeChat') {
      const activeChat = newProps as ChatInfo;

      const chatAvatar = this.children.chatAvatar;

      const chatInfo = this.children.chatInfo;
      const chatInfoAvatar = chatInfo.children.avatar;
      const chatInfoTitle = chatInfo.children.profileName;

      if (isPlainObject(activeChat) && !isEmptyObject(activeChat)) {
        chatInfo.setProps({
          ...chatInfo.props,
          profileId: activeChat.id,
        });
        chatInfoAvatar.setProps({
          ...chatInfoAvatar.props,
          src: getAvatarUrl(activeChat.avatar),
          alt: `Аватар чата ${activeChat.title}`,
        });
  
        chatInfoTitle.setProps({
          ...chatInfoTitle.props,
          text: activeChat.title,
        });
  
        chatAvatar.setProps({
          ...chatAvatar.props,
          src: getAvatarUrl(activeChat.avatar),
        });
      }
    } else if (dependence === 'activeChatMessages') {
      const messages = newProps as IMessageProps[];
      const messagesList = this.children.messagesList;

      messagesList.setProps({
        ...messagesList.props,
        list: messages,
      });
    } else if (dependence === 'activeChatUsers') {
      const users = newProps as ChatUserInfo[];
      const usersList = this.children.usersList;

      usersList.setProps({
        ...usersList.props,
        list: users,
      });
    }
  }
}

export default withChats(ChatPage);

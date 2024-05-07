import BaseComponent from '@utils/base-component';
import ChatMember from '@components/molecules/chat-member';
import ChatService from '@services/chat-service';
import { IListFactory } from '@components/organisms/list';
import { ChatUserInfo } from '@/store/initial-state';
import { getAvatarUrl } from '@utils/get-resources-url';


class ChatUsersListFactory implements IListFactory {
  getListItemComponent(props: ChatUserInfo): BaseComponent {
    const chatUserActions = {
      icon: '/icons/removeUser.svg',
      additionalClasses: 'button_with-icon',
      events: {
        mousedown: (event: Event) => {
          const target = event.target as HTMLElement;

          const selectedUser = target.closest('.chat-member') as HTMLElement;
          const selectedUserID = selectedUser.getAttribute('data-chat-member-id');

          if (selectedUserID !== null) {
            ChatService.deleteUserFromActiveChat(selectedUserID);
          }
        },
      },
    };

    return new ChatMember({
      id: props.id,
      avatar: {
        src: getAvatarUrl(props.avatar),
        alt: `Аватар пользователя ${props.first_name} ${props.second_name}`,
      },
      name: props.display_name,
      actions: chatUserActions,
    });
  }
}

export default ChatUsersListFactory;

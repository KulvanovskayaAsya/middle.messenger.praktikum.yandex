import { getAvatarUrl } from '@utils/get-resources-url';
import BaseComponent from '@utils/base-component';
import Chat from '@components/molecules/chat';
import ChatService from '@/services/chat-service';
import store from '@/store';
import { IListFactory } from '@components/organisms/list';
import { ChatInfo } from '@/store/initial-state';

class ChatsListFactory implements IListFactory {
  getListItemComponent(props: ChatInfo): BaseComponent {
    const currentActiveChatID = store.getState().activeChatID;
    const chatAdditionalClasses = currentActiveChatID == props.id ? 'chat_active' : '';
    
    return new Chat({
      id: props.id,
      avatar: {
        src: getAvatarUrl(props.avatar),
        alt: `Аватар чата ${props.title}`,
      },
      name: props.title,
      lastMessage: props.last_message?.content || 'Нет сообщений',
      unreadedCount: props.unread_count,
      additionalClasses: chatAdditionalClasses,
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

export default ChatsListFactory;

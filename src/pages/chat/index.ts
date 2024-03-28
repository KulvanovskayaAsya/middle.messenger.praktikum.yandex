import BaseComponent from "../../utils/base-component";
import { chatsList } from "../../utils/mock-data";
import Chat from "../../components/molecules/chat";
import Avatar from "../../components/atoms/avatar";

const chats = chatsList.map(chat => new Chat({
  avatar: chat.avatar,
  name: chat.name,
  lastMessage: chat.lastMessage,
  unreadedCount: chat.unreadedCount,
}));

class ChatPage extends BaseComponent {
  constructor(props) {
    super({
      ...props,
      avatar: new Avatar
    });
  }

  render() {
    const formElement = document.createElement('div');
    formElement.classList.add('form');

    chats.forEach((chat) => {
      formElement.appendChild(chat.getContent());
    });
    
    Object.values(this.children).forEach((child) => {
      formElement.appendChild(child.getContent());
    });

    return formElement;
  }
}

export default ChatPage;

import Block from "../../utils/block";
import { chatsList } from "../../utils/mock-data";
import Chat from "../../components/molecules/chat";

class ChatPage extends Block {
  constructor() {
    super("div", {});
  }

  render(): string {
    const chatItemsHtml = chatsList
      .map((chat) => new Chat(chat).render())
      .join("");

    // Предполагается, что у вас есть шаблон для ChatPage или вы строите его здесь
    return `
      <div class='chat-page'>
        <aside class='chat-list'>${chatItemsHtml}</aside>
        <main class='chat-content'>Выберите чат или начните новый диалог</main>
      </div>
    `;
  }
}

export default ChatPage;

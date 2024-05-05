import store from '@/store';
import ChatAPI from '@/api/chat-api';
import { ChatInfo } from '@/store/initial-state';
import WebSocketTransport, { MessageEventHandlers } from '@utils/WS-transport';
import { isArray } from '@utils/type-check';

export type WSMessageType = 'message' | 'file' | 'sticker' | 'get old';

export type WSMessage = {
  content: string | number,
  type: WSMessageType
};

class ChatService {
  socket: WebSocketTransport | null = null;

  public async getChatsList() {
    try {
      const profileChats = JSON.parse(await ChatAPI.getChats() as string);

      this._setStoreChatsList(profileChats);
    } catch (error) {
      alert('Ошибка получения чатов: ' + error);
    }
  }

  public async createChat(chatData: any) {
    try {
      const chatTitle = {
        title: chatData.chatTitle,
      };
      
      const { id } = JSON.parse(await ChatAPI.createChat(chatTitle) as string);

      const chatInfo = {
        userIDs: [
          chatData.chatUser,
        ],
        chatID: id,
      };

      await ChatAPI.addUsersToChat(chatInfo);

      this.getChatsList();
    } catch (error) {
      alert('Ошибка создания чата: ' + error);
    }
  }

  private async _setStoreChatsList(chatInfo: ChatInfo[]) {
    store.setState('chatsList', [...chatInfo]);
  }

  public async setActiveChat(chatId: number) {
    const currentActiveChatID = store.getState().activeChatID;

    if (currentActiveChatID != chatId) {
      store.setState('activeChatMessges', []);
      store.setState('activeChatID', chatId);
      await this._createWSConnection(chatId);
      await this.socket?.waitForOpen();
      this.getChatMessages(0);
    }
  }

  private async _createWSConnection(chatID: number) {
    const userID = store.getState().profileInfo.id;
    const { token } = JSON.parse(await ChatAPI.getToken(chatID) as string);

    const WSUrl = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`;
    const handlers: MessageEventHandlers = {
      onMessage: this._handleMessage,
      onError: this._handleError,
    };

    this.socket = new WebSocketTransport(WSUrl, handlers);
  }

  public sendMessage(message: string) {
    const data: WSMessage = {
      type: 'message',
      content: message,
    };

    this.socket?.send(data);
  }

  public getChatMessages(count: number) {
    const data: WSMessage = {
      type: 'get old',
      content: count,
    };

    this.socket?.send(data);
  }

  private _handleMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data);

    if (isArray(data)) {
      store.setState('activeChatMessages', data.reverse());
    }

    if (data.type === 'message') {
      store.setState('activeChatMessages', [ ...store.getState().activeChatMessages, data]);
    }
  }

  private _handleError(event: Event): void {
    console.error('Ошибка коннекта:', event);
  }
}

export default new ChatService();

import store from '@/store';
import ChatAPI from '@/api/chat-api';
import { ChatInfo, ChatUserInfo } from '@/store/initial-state';
import WebSocketTransport, { MessageEventHandlers } from '@utils/WS-transport';
import { isArray, isEmptyString } from '@utils/type-check';

export type WSMessageType = 'message' | 'file' | 'sticker' | 'get old';

export type WSMessage = {
  content: string | number,
  type: WSMessageType
};

class ChatService {
  socket: WebSocketTransport | null = null;

  private _setStoreChatsList(chatInfo: ChatInfo[]) {
    store.setState('chats', [...chatInfo]);
  }

  private _setStoreActiveChatUsers(ChatUserInfo: ChatUserInfo[]) {
    store.setState('activeChatUsers', ChatUserInfo);
  }

  private _setStoreActiveChat(chatInfo: ChatInfo) {
    store.setState('activeChat', chatInfo);
  }

  private _getActiveChat() {
    return store.getState().activeChat;
  }

  private _getActiveChatID() {
    return store.getState().activeChatID;
  }

  private _getChats() {
    return store.getState().chats;
  }

  private _handleMessage(event: MessageEvent): void {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch (error) {
      alert(`Получено сообщение с невалидными данными: ${error}`);
    }

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

  private async _createWSConnection(chatID: number) {
    const userID = store.getState().profile.id;
    const { token } = JSON.parse(await ChatAPI.getToken(chatID) as string);

    const WSUrl = `wss://ya-praktikum.tech/ws/chats/${userID}/${chatID}/${token}`;
    const handlers: MessageEventHandlers = {
      onMessage: this._handleMessage,
      onError: this._handleError,
    };

    this.socket = new WebSocketTransport(WSUrl, handlers);
  }

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

      if (isEmptyString(chatData.chatUser)) {
        const chatInfo = {
          users: [
            chatData.chatUser,
          ],
          chatId: id,
        };
  
        await ChatAPI.addChatUsers(chatInfo);
      }

      this.getChatsList();
    } catch (error) {
      alert('Ошибка создания чата: ' + error);
    }
  }

  public async addUserToActiveChat(userID: string | number) {
    const chatID = this._getActiveChatID();
    const chatInfo = {
      users: [
        String(userID),
      ],
      chatId: String(chatID),
    };

    await ChatAPI.addChatUsers(chatInfo);
    this.getChatUsers(chatID);
  }

  public getChatMessages(count: number) {
    const data: WSMessage = {
      type: 'get old',
      content: count,
    };

    this.socket?.send(data);
  }

  public async getChatUsers(chatID: number) {
    try {
      const chatUsers = JSON.parse(await ChatAPI.getChatUsers(chatID) as string);

      this._setStoreActiveChatUsers(chatUsers);
    } catch (error) {
      alert('Пользователи чата не найдены: ' + error);
    }
  }

  public async setActiveChat(chatId: number) {
    const currentActiveChatID = this._getActiveChatID();

    if (currentActiveChatID != chatId) {
      store.setState('activeChatMessages', []);
      store.setState('activeChatUsers', []);
      store.setState('activeChat', {});
      store.setState('activeChatID', chatId);
      await this._createWSConnection(chatId);
      await this.socket?.waitForOpen();
      this.getChatMessages(0);
      const newActiveChat = this.getChatInfo(chatId);
      this._setStoreActiveChat(newActiveChat);
      this.getChatUsers(chatId);
    }
  }

  public getChatInfo(chatId: number) {
    const chats = this._getChats();

    return chats.find((chat: ChatInfo) => chat.id === chatId) || {};
  }

  public async deleteUserFromActiveChat(userID: number | string) {
    const chatID: number = this._getActiveChatID();
    const dataForAPI = {
      chatId: String(chatID),
      users: [
        String(userID),
      ],
    };

    await ChatAPI.deleteChatUsers(dataForAPI);
    this.getChatUsers(chatID);
  }

  public async changeActiveChatAvatar(avatarFile: File) {
    try {
      const chatData = await JSON.parse(await ChatAPI.changeAvatar(this._getActiveChatID(), avatarFile) as string);

      const chats = this._getChats();
      const updatedActiveChat = {
        ...this._getActiveChat(),
        avatar: chatData.avatar,
      };
      const updatedChats = chats.map((chat: ChatInfo) => {
        if (chat.id === chatData.id) {
          return { ...chat, avatar: chatData.avatar };
        }
        return chat;
      });

      this._setStoreChatsList(updatedChats);
      this._setStoreActiveChat(updatedActiveChat);
    } catch (error) {
      alert('Ошибка обновления аватара профиля: ' + error);
    }
  }

  public sendMessage(message: string) {
    if (isEmptyString(message)) {
      return;
    }

    const data: WSMessage = {
      type: 'message',
      content: message,
    };

    this.socket?.send(data);
  }
}

export default new ChatService();

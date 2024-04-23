import store from '@/store';
import ChatAPI from '@/api/chat-api';
import { ChatInfo } from '@/store/initial-state';

class ChatService {
  API: ChatAPI = new ChatAPI();

  public async getChatsList() {
    try {
      const profileChats = JSON.parse(await this.API.getChats() as string);

      this._setStoreChatsList(profileChats);
    } catch (error) {
      alert('Ошибка получения чатов: ' + error);
    }
  }

  private async _setStoreChatsList(chatInfo: ChatInfo[]) {
    store.setState('chatsList', {
      ...chatInfo
    });
  }

  // public async createChat(data: { title: string }) {
  //   try {
  //     const response = await this.API.createChat(data);
  //     return response;
  //   } catch (error) {
  //     console.error('Ошибка создания чата:', error);
  //     alert('Ошибка создания чата: ' + error);
  //     return null;
  //   }
  // }

  // public async deleteChat(chatId: string) {
  //   try {
  //     const response = await this.API.deleteChat(chatId);
  //     return response;
  //   } catch (error) {
  //     console.error('Ошибка удаления чата:', error);
  //     alert('Ошибка удаления чата: ' + error);
  //     return null;
  //   }
  // }

  // public async getUsersByChatId(chatId: string) {
  //   try {
  //     const response = await this.API.getUsersByChatId(chatId);
  //     return response;
  //   } catch (error) {
  //     console.error('Ошибка получения пользователей чата:', error);
  //     alert('Ошибка получения пользователей чата: ' + error);
  //     return null;
  //   }
  // }

  // public async getNewMessagesCount(chatId: string) {
  //   try {
  //     const response = await this.API.getNewMessagesCount(chatId);
  //     return response;
  //   } catch (error) {
  //     console.error('Ошибка получения новых сообщений:', error);
  //     alert('Ошибка получения новых сообщений: ' + error);
  //     return null;
  //   }
  // }

  // public async uploadChatAvatar(data: FormData) {
  //   try {
  //     const response = await this.API.uploadChatAvatar(data);
  //     return response;
  //   } catch (error) {
  //     console.error('Ошибка обновления аватара чата:', error);
  //     alert('Ошибка обновления аватара чата: ' + error);
  //     return null;
  //   }
  // }

  // public async addUsersToChat(data: { chatId: string; userIds: string[] }) {
  //   try {
  //     const response = await this.API.addUsersToChat(data);
  //     return response;
  //   } catch (error) {
  //     console.error('Ошибка добавления пользователей в чат:', error);
  //     alert('Ошибка добавления пользователей в чат: ' + error);
  //     return null;
  //   }
  // }

  // public async removeUsersFromChat(data: { chatId: string; userIds: string[] }) {
  //   try {
  //     const response = await this.API.removeUsersFromChat(data);
  //     return response;
  //   } catch (error) {
  //     console.error('Ошибка удаления пользователей из чата:', error);
  //     alert('Ошибка удаления пользователей из чата: ' + error);
  //     return null;
  //   }
  // }
}

export default ChatService;

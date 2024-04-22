import BaseAPI from '@/api/base-api';

const API_BASE_PATH = '/chats';

class ChatAPI extends BaseAPI {
  constructor() {
    super(API_BASE_PATH);
  }

  getChats() {
    return this.http.get('', {});
  }

  createChat(data: { title: string }) {
    return this.http.post('/', { data });
  }

  deleteChat(chatId: string) {
    return this.http.delete('/', { data: { id: chatId } });
  }

  getUsersByChatId(chatId: string) {
    return this.http.get(`/${chatId}/users`, {});
  }

  getNewMessagesCount(chatId: string) {
    return this.http.get(`/new/${chatId}`, {});
  }

  uploadChatAvatar(data: FormData) {
    return this.http.put('/avatar', { data });
  }

  addUsersToChat(data: { chatId: string; userIds: string[] }) {
    return this.http.put('/users', { data });
  }

  removeUsersFromChat(data: { chatId: string; userIds: string[] }) {
    return this.http.delete('/users', { data });
  }
}

export default ChatAPI;

import BaseAPI from '@/api/base-api';

const API_BASE_PATH = '/chats';

export type ChatData = {
  title: string;
};

export type UsersWithChatData = {
  chatID: string; 
  userIDs: string[];
};

class ChatAPI extends BaseAPI {
  constructor() {
    super(API_BASE_PATH);
  }

  getChats() {
    return this.http.get('', {});
  }

  getToken(id: number) {
    return this.http.post(`/token/${id}`, {});
  }

  createChat(data: ChatData) {
    return this.http.post('/', { data });
  }

  getNewMessagesCount(chatID: string) {
    return this.http.get(`/new/${chatID}`, {});
  }

  addUsersToChat(data: UsersWithChatData) {
    return this.http.put('/users', { data });
  }
}

export default new ChatAPI();

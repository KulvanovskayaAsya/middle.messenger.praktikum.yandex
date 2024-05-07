import BaseAPI from '@/api/base-api';

const API_BASE_PATH = '/chats';

export type ChatData = {
  title: string;
};

export type UsersWithChatData = {
  chatId: string; 
  users: string[];
};

class ChatAPI extends BaseAPI {
  constructor() {
    super(API_BASE_PATH);
  }

  getChats() {
    return this.http.get('', {});
  }

  createChat(data: ChatData) {
    return this.http.post('/', { data });
  }

  getToken(id: number) {
    return this.http.post(`/token/${id}`, {});
  }

  getChatUsers(chatID: number) {
    return this.http.get(`/${chatID}/users`, {});
  }

  changeAvatar(chatId: number, avatar: File) {
    const data = new FormData();
    
    data.append('chatId', String(chatId));
    data.append('avatar', avatar);

    return this.http.put('/avatar', { data });
  }

  addChatUsers(data: UsersWithChatData) {
    console.log('addChatUsers', data);
    return this.http.put('/users', { data });
  }

  deleteChatUsers(data: UsersWithChatData) {
    return this.http.delete('/users', { data });
  }
}

export default new ChatAPI();

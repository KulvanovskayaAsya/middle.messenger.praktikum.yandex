import BaseAPI from '@/api/base-api';

const API_BASE_PATH = '/chat';

class ChatAPI extends BaseAPI {
  constructor() {
    super(API_BASE_PATH);
  }
}

export default ChatAPI;

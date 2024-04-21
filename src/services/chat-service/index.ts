import HTTP from '../../utils/HTTP-transport';

const chatAPIInstance = new HTTP('/chats');

class ChatService {
  create() {
    return chatAPIInstance.post('/', {title: 'string'});
  }

  request() {
    return chatAPIInstance.get('/full');
  }
}

export default ChatService;

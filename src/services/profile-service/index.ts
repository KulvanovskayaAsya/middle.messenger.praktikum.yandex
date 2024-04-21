import store from '@/store';
import router from '@/router';
import ProfileAPI, { ProfileData, PasswordData } from '@/api/profile-api';

class ChatService {
  API: ProfileAPI = new ProfileAPI();
}

export default ChatService;

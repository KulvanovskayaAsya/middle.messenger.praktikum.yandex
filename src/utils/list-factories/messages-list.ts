import { IListFactory } from '@/components/organisms/list';
import BaseComponent from '@utils/base-component';
import Message from '@components/atoms/message';
import store from '@/store';
import { MessageInfo } from '@/store/initial-state';

class MessagesListFactory implements IListFactory {
  getListItemComponent(props: MessageInfo): BaseComponent {
    if (props.user_id === store.getState().profile.id) {
      return new Message({
        text: props.content,
        date: props.time,
        additionalClasses: 'message_mine',
      });
    } else {
      return new Message({
        text: props.content,
        date: props.time,
      });
    }
  }
}

export default MessagesListFactory;

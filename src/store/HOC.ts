import store, { StoreEvents } from '@/store';
import BaseComponent from '@utils/base-component';
import isEqual from '@utils/object-comparing';

type Indexed<T = unknown> = {
  [key: string]: T;
};

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof BaseComponent) {
    // @ts-expect-error данный класс не должен реализовывать render метод, иначе не получилось решить проблему
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState;
          }
        });
      }
    };
  };
}

export const withProfile = connect(state => ({ profile: state.profileInfo }));
export const withChats = connect(state => ({
  profile: state.profileInfo,
  chats: state.chatsList,
  activeChatID: state.activeChatID,
  activeChatMessages: state.activeChatMessages,
}));

export default connect;

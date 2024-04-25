import store, { StoreEvents } from '@/store';
import BaseComponent from '@/utils/base-component';
import isEqual from '@/utils/object-comparing';

type Indexed<T = unknown> = {
  [key: string]: T;
};

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: typeof BaseComponent) {
    return class extends Component {
      constructor(props: any) {
        let state = mapStateToProps(store.getState());
        super({...props, ...state});

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
  chats: state.chatsList,
  profile: state.profileInfo
}));

export default connect;

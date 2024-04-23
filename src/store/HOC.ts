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
        super(props);
        this.state = mapStateToProps(store.getState());

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          
          if (!isEqual(this.state, newState)) {
            this.setProps({ ...newState });
            this.state = newState;
          }
        });
      }
    };
  };
}

export const withProfile = connect(state => ({ profile: state.profileInfo }));

export default connect;

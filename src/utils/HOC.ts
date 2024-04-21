import store, { StoreEvents } from '@/store';

type Indexed<T = unknown> = {
  [key: string]: T;
};

function isEqual(a: any, b: any): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function(Component: any) {
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

export default connect;

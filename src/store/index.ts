import EventBus from '@/utils/event-bus';
import initialState from '@/store/initial-state';

export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = unknown> = {
  [key: string]: T;
};

function isObject(item: unknown): boolean {
  return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if(typeof path !== 'string') {
    throw new Error('path must be string');
  }
  
  if(typeof object !== 'object' || object === null) {
    return object;
  }
  
  const keysArray = path.split('.');
  const keysCount = keysArray.length - 1;
  let current = object as Indexed;

  for (let i = 0; i < keysCount; i++) {
    const key = keysArray[i];
    
    if (!isObject(current[key])) {
      current[key] = {};
    }
    
    current = current[key] as Indexed;
  }

  current[keysArray[keysCount]] = value;
  
  return object;
}

class Store<State extends Record<string, any>> extends EventBus {
  private state: State;

  constructor(initialState: State) {
    super();
    this.state = initialState;
  }

  public getState(): State {
    return this.state;
  }

  public setState(path: string, value: unknown): void {
    console.log(path, value);
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store<Record<string, any>>(initialState);

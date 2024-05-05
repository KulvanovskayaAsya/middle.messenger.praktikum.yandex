const enum WSEvents {
  OPEN = 'open',
  MESSAGE = 'message',
  ERROR = 'error',
  CLOSE = 'close',
}

export type MessageEventHandlers = {
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onMessage?: (event: MessageEvent) => void;
  onError?: (event: Event) => void;
};

class WebSocketTransport {
  private socket: WebSocket | null = null;

  private eventHandlers: MessageEventHandlers;

  private _url: string;

  private pingInterval: ReturnType<typeof setInterval> | null = null;

  private readonly pingIntervalTime = 30000;

  private openPromise: Promise<void>;

  private resolveOpenPromise!: () => void;

  constructor(url: string, eventHandlers: MessageEventHandlers) {
    this._url = url;
    this.eventHandlers = eventHandlers;
    this.openPromise = new Promise(resolve => {
      this.resolveOpenPromise = resolve;
    });

    this._connect();
  }

  public waitForOpen(): Promise<void> {
    return this.openPromise;
  }

  private _connect(): void {
    if (this.socket) {
      throw new Error('The socket is already connected');
    }

    this.socket = new WebSocket(this._url);

    this.socket.addEventListener(WSEvents.OPEN, (event: Event) => {
      if (this.eventHandlers.onOpen) {
        this.eventHandlers.onOpen(event);
      }
      this.resolveOpenPromise();
    });

    this._setupPing();

    if (this.eventHandlers.onOpen) {
      this.socket.addEventListener(WSEvents.OPEN, this.eventHandlers.onOpen);
    }

    if (this.eventHandlers.onMessage) {
      this.socket.addEventListener(WSEvents.MESSAGE, this.eventHandlers.onMessage);
    }

    if (this.eventHandlers.onError) {
      this.socket.addEventListener(WSEvents.ERROR, this.eventHandlers.onError);
    }

    if (this.eventHandlers.onClose) {
      this.socket.addEventListener(WSEvents.CLOSE, this.eventHandlers.onClose);
    }
  }

  public send(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket?.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  }

  public close() {
    if (this.socket) {
      this.socket.close();
    }

    clearInterval(this.pingInterval as number);
    this.pingInterval = null;
  }

  private _setupPing() {
    const data = {
      type: 'ping',
    };
    this.pingInterval = setInterval(() => {
      this.socket?.send(JSON.stringify(data));
    }, this.pingIntervalTime);
  }
}

export default WebSocketTransport;

import EventBus from '@/utils/event-bus';

const enum WSEvents {
  ERROR = 'error',
  CONNECTED = 'connected',
  CLOSE = 'close',
  MESSAGE = 'message',
}

class WebSocketTransport extends EventBus{
  private ws: WebSocket | null = null;
  private url: string = '';

  private socket?: WebSocket;
  private pingInterval: ReturnType<typeof setInterval> | null = null;
  private readonly pingIntervalTime = 30000;
  
  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: object) {
    if (!this.ws) {
      throw new Error( 'Socket is not connected');
    }

    this.ws.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.ws) {
      throw new Error ('The socket is already connected');
    }

    this.ws = new WebSocket(this.url);
    this.subscribe(this.ws);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSEvents.ERROR, reject);
      this.on(WSEvents.CONNECTED, () => {
        this.off(WSEvents.ERROR, reject);
        resolve();
      })
    })
  }

  public close() {
    this.ws?.close();
    clearInterval(this.pingInterval);
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({type: 'ping'});
    }, this.pingIntervalTime);

    this.on(WSEvents.CLOSE, () => {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    })
  }

  private subscribe(ws: WebSocket) {
    ws.addEventListener('error', (event: Event) => {
      this.emit(WSEvents.ERROR, event)
    });

    // ws.addEventListener('connected', (message: MessageEvent<unknown>) => {
    //   const data = JSON.parse(message.data);
    //   this.emit(WSEvents.MESSAGE, data);
    // });

    ws.addEventListener('open', () => {
      this.emit(WSEvents.CONNECTED);
    });

    ws.addEventListener('close', () => {
      this.emit(WSEvents.CLOSE);
    });
  }
}

export default WebSocketTransport;

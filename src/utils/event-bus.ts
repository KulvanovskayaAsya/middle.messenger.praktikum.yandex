type EventName = string;
type Listener = (...args: unknown[]) => void;

type ListenersList = Record<EventName, Listener[]>;

class EventBus {
	private listeners: ListenersList = {};

  public on(event: EventName, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: EventName, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  public emit<T extends unknown[]>(event: EventName, ...args: T): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;

import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import EventBus from './event-bus';

type Props = Record<string, unknown>;
type Children = Record<string, Block>;

type PropsAndChildren = {
  children?: Children
  props?: Props
  blockArrays?: Record<string, Block[]>
  [prop: string]: unknown
}

type Meta = {
  tagName: string;
  props: Props;
}

enum EVENTS {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_RENDER = 'flow:render'
}

class Block {
  static LIFECICLE_EVENTS = EVENTS;

  public id = uuidv4();

  private _element: HTMLElement;
  private _meta: Meta | null = null;

  props: Props;
  private eventBus: EventBus;

  constructor(propsAndChildren) {
    const eventBus = new EventBus();
    this.eventBus = eventBus;

    this._registerEvents(eventBus);

    this._meta = {
      tagName,
      props,
    };
    this._element = document.createElement(tagName);
    this.props = this._makePropsProxy(props);

    eventBus.emit(Block.LIFECICLE_EVENTS.INIT);
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private _createResources(): void {
    const tagName = this._meta?.tagName ?? "div";
    this._element = this._createDocumentElement(tagName);
  }

  public get element(): HTMLElement {
    return this._element;
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _makePropsProxy(props: Props): Props {
    return new Proxy(props, {
      set: (target: Props, prop: string, value: any): boolean => {
        const oldProps = { ...target };
        target[prop] = value;
        this.eventBus.emit(Block.LIFECICLE_EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error("Нет доступа");
      },
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.LIFECICLE_EVENTS.INIT, this.init.bind(this));
    eventBus.on(
      Block.LIFECICLE_EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    eventBus.on(
      Block.LIFECICLE_EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    eventBus.on(Block.LIFECICLE_EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private init(): void {
    this._createResources();
    this.eventBus.emit(Block.LIFECICLE_EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  public componentDidMount(): void {
    // для переопределения в потомках
  }

  private dispatchComponentDidMount(): void {
    this.eventBus.emit(Block.LIFECICLE_EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown): void {
    const response = this.componentDidUpdate(
      oldProps as Props,
      newProps as Props
    );

    if (response) {
      this.eventBus.emit(Block.LIFECICLE_EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  private _render(): void {
    const block = this.render();
    if (this._element) {
      this._element.innerHTML = block;
    }
  }

  protected render(): string {
    return "";
  }

  _addEvents() {
    const { events = {}, eventInterception } = this.props as { events: Record<string, Function>, eventInterception:boolean };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject, eventInterception);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props as { events: Record<string, Function> };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName] as EventListenerOrEventListenerObject);
    });
  }

  public show(): void {
    if (this._element) {
      this._element.style.display = "block";
    }
  }

  public hide(): void {
    if (this._element) {
      this._element.style.display = "none";
    }
  }
}

export default Block;
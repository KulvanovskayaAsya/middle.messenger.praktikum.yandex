import { v4 as uuidv4 } from 'uuid';
import Handlebars from 'handlebars';

import EventBus from './event-bus';
import isEqual from './object-comparing';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export type Props = {
  [key: string]: unknown;
  events?: Record<string, (e: Event) => void>;
};
type Children = Record<string, BaseComponent>;

// не получилось типизировать
type PropsAndChildren = {
};

abstract class BaseComponent {
  static LIFECICLE_EVENTS = EVENTS;

  private _id: string;
  private _element: HTMLElement | null = null;
  private eventBus: EventBus;

  public props: Props;
  public children: Children;

  constructor(propsAndChildren: PropsAndChildren = {}) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildrenAndProps(propsAndChildren);

    this._id = uuidv4();
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BaseComponent.LIFECICLE_EVENTS.INIT);
  }

  private _getChildrenAndProps(propsAndChildren: PropsAndChildren): { children: Children; props: Props } {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      console.log(key,value)
      if (value instanceof BaseComponent) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    // console.log(this, children);
    return { children, props };
  }

  private _makePropsProxy(props: Props): Props {
    return new Proxy(props, {
      set: (target: Props, prop: string, value: unknown): boolean => {
        const oldProps = { ...target };
        target[prop] = value;
        this.eventBus.emit(BaseComponent.LIFECICLE_EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа');
      },
    });
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.INIT, this._init.bind(this));
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  public get element() {
    return this._element;
  }

  public getContent(): HTMLElement {
    if (this._element !== null) { return this._element; }

    throw new Error('Element is not created');
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _init(): void {
    this.eventBus.emit(BaseComponent.LIFECICLE_EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child._dispatchComponentDidMount();
    });
  }

  public componentDidMount(): void {
    // для переопределения в потомках
  }

  private _dispatchComponentDidMount(): void {
    this.eventBus.emit(BaseComponent.LIFECICLE_EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const shouldUpdate = this.componentDidUpdate(
      oldProps as Props,
      newProps as Props,
    );

    // console.log('shouldUpdate = ', shouldUpdate);

    if (shouldUpdate) {
      this.eventBus.emit(BaseComponent.LIFECICLE_EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return !isEqual(oldProps, newProps);
  }

  private _render(): void {
    const block = this.render();
    this._removeEvents();
    if (!this._element) {
      this._element = document.createElement('div');
    }
    this._element.replaceWith(block);
    this._element = block;
    this._addEvents();
  }

  abstract render(): HTMLElement;

  compile(template: string, props: Props): HTMLElement {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id='id-${child._id}'></div>`;
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    if (!fragment.content.firstElementChild) {
      throw new Error('Template did not produce any content');
    }

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id='id-${child._id}']`);
      if (stub) {
        const stubElement = stub;
        stubElement.replaceWith(child.getContent() ?? document.createElement('div'));
      }
    });

    return fragment.content.firstElementChild as HTMLElement;
  }

  _addEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName]);
      });
    }
  }

  _removeEvents() {
    const { events } = this.props;

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName]);
      });
    }
  }

  public show(): void {
    if (this._element) {
      this._element.style.display = 'block';
    }
  }

  public hide(): void {
    if (this._element) {
      this._element.style.display = 'none';
    }
  }
}

export default BaseComponent;

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

export interface IProps {
  [key: string]: unknown;
  dependences?: string[] | [];
  events?: Record<string, (e: Event) => void>;
  additionalClasses?: string;
}

type Children = Record<string, BaseComponent>;

type PropsAndChildren = {
  [key: string]: unknown;
};

abstract class BaseComponent {
  static LIFECICLE_EVENTS = EVENTS;

  protected _dependences: string[] | [] = [];

  private _id: string;

  private _element: HTMLElement | null = null;

  private eventBus: EventBus;

  public props: IProps;

  public children: Children;

  constructor(propsAndChildren: PropsAndChildren = {}) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildrenAndProps(propsAndChildren);

    if (props.dependences) {
      this._dependences = props.dependences;
    }

    this._id = uuidv4();
    this.props = this._makePropsProxy(props);
    this.children = children;
    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BaseComponent.LIFECICLE_EVENTS.INIT);
  }

  dependsOnProps(): string[] {
    return this._dependences;
  }

  private _getChildrenAndProps(propsAndChildren: PropsAndChildren): { children: Children; props: IProps } {
    const children: Children = {};
    const props: IProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof BaseComponent) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _makePropsProxy(props: IProps): IProps {
    return new Proxy(props, {
      set: (target: IProps, prop: string, value: unknown): boolean => {
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

  public setProps = (nextProps: IProps): void => {
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

  private _componentDidUpdate(oldProps: IProps, newProps: IProps): void {
    const shouldUpdate = this.componentDidUpdate(
      oldProps as IProps,
      newProps as IProps,
    );

    if (shouldUpdate) {
      this.eventBus.emit(BaseComponent.LIFECICLE_EVENTS.FLOW_RENDER);

      Object.values(this.children).forEach(child => {
        const dependencies = child.dependsOnProps();
        const hasDependencyChanged = dependencies.some(dep => {
          if (this instanceof BasePage) {
            this.updateChildrenDependentProps(newProps[dep], dep);
          }

          child._init();

          return !isEqual(oldProps[dep], newProps[dep]);
        });

        if (hasDependencyChanged) {
          this._init();
        }
      });
    }
  }

  public componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
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

  compile(template: string, props: IProps): HTMLElement {
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

export abstract class BasePage extends BaseComponent {
  abstract updateChildrenDependentProps(newProp: unknown, dependence?: string): void;
}

export default BaseComponent;

import { v4 as uuidv4 } from 'uuid';
import Handlebars from 'handlebars';

import EventBus from './event-bus';

enum EVENTS {
	INIT = 'init',
	FLOW_CDM = 'flow:component-did-mount',
	FLOW_CDU = 'flow:component-did-update',
	FLOW_RENDER = 'flow:render'
};

type Props = {
	events?: Record<string, (e: Event) => void>,
	[key: string]: unknown;
};
type Children = Record<string, BaseComponent>;
/* обработчик заранее неизвестен и может возвращать любое значение или не возвращать ничего */
type EventHandlers = {
  [K in keyof GlobalEventHandlersEventMap]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any
};

type PropsAndChildren = {
	children?: Children,
  props?: Props,
  events?: EventHandlers;
};

abstract class BaseComponent {
	static LIFECICLE_EVENTS = EVENTS;

	private _id: string;
	private _element: HTMLElement | null = null;
	private eventBus: EventBus;

	public props: Props;
  public children: Children;

	constructor(propsAndChildren: PropsAndChildren = {}) {
		const eventBus = new EventBus;
		const { children, props } = this._getChildrenAndProps(propsAndChildren);

		this._id = uuidv4();
		this.props = this._makePropsProxy(props);
		this.children = children;
    console.log(this.children)
		this.eventBus = eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(BaseComponent.LIFECICLE_EVENTS.INIT);
	}

	private _getChildrenAndProps(propsAndChildren: PropsAndChildren): { children: Children; props: Props } {
    const children: Children = {};
    const props: Props = {};

    console.log(this, propsAndChildren);
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      console.log(key, value)
      if (value instanceof BaseComponent) {
        console.log('child = ', value)
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  };

	private _makePropsProxy(props: Props): Props {
    return new Proxy(props, {
      set: (target: Props, prop: string, value: unknown): boolean => {
        const oldProps = { ...target };
        target[prop] = value;
        this.eventBus.emit(BaseComponent.LIFECICLE_EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty(): boolean {
        throw new Error("Нет доступа");
      },
    });
  };

	private _registerEvents(eventBus: EventBus): void {
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.INIT, this._init.bind(this));
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BaseComponent.LIFECICLE_EVENTS.FLOW_RENDER, this._render.bind(this));
  };

  public get element() {
    return this._element;
  }

  public getContent() {
    return this._element;
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
    })
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
      newProps as Props
    );

    if (shouldUpdate) {
      this.eventBus.emit(BaseComponent.LIFECICLE_EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  private _render(): void {
    const block = this.render();
		this._removeEvents();
    if (!this._element) {
      this._element = document.createElement('div'); // или любой другой тег, подходящий для вашего компонента
  }
    this._element = block;
		this._addEvents();
  }

  abstract render(): HTMLElement;

	compile(template: string, props: Props): HTMLElement {
		const propsAndStubs = { ...props };
	
		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="id-${child._id}"></div>`;
		});
	
		const fragment = document.createElement('template');
		fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
	
		Object.values(this.children).forEach(child => {
			const stub = fragment.content.querySelector(`[data-id="id-${child._id}"]`);
			if (stub) {
				stub.replaceWith(child.getContent() ?? '');
			}
		});

		return fragment.content.firstElementChild;
	}

  _addEvents() {
    const { events } = this.props;
    // console.log('_addEvents = ', events);

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.addEventListener(eventName, events[eventName])
      })
    }
  }

  _removeEvents() {
    const { events } = this.props

    if (events) {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName])
      })
    }
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

export default BaseComponent;
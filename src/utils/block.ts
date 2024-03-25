import EventBus from './eventBus';

type Props = Record<string, unknown>;

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

	private _element: HTMLElement | null = null;
	private _meta: Meta | null = null;
	private eventBus: () => EventBus;
	public props: Props;

	constructor(propsWithChildren = {}) {
		const eventBus = new EventBus();
    this.eventBus = () => eventBus;
    eventBus.emit(Block.LIFECICLE_EVENTS.INIT);
  }
}

export default Block;
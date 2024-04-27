import BaseComponent from '@utils/base-component';
import './input.scss';
import template from './input.hbs?raw';

export interface IInputProps {
  id: string;
  value?: string;
  additionalClasses?: string;
  inputType?: string;
  name: string;
  events?: Record<string, (e: Event) => void>;
}

class Input extends BaseComponent {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        ...props.events,
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          
          if (target) {
            this.setAttribute('value', target.value);
          }
        },
      },
    });
  }

  dependsOnProps(): string[] {
    return [];
  }

  public setAttribute(attr: string, value: string) {
    this._element?.setAttribute(attr, value);
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Input;

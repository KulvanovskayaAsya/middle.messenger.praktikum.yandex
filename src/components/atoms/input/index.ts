import BaseComponent, { Props } from '../../../utils/base-component';
import './input.scss';
import template from './input.hbs?raw';

import isObjectsEqual from '../../../utils/object-comparing';

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
            this.setProps({
              ...this.props,
              value: target.value,
            });
          }
        }
      },
    });
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const { value: oldValue, ...oldPropsWithoutValue } = oldProps;
    const { value: newValue, ...newPropsWithoutValue } = newProps;
  
    return !isObjectsEqual(oldPropsWithoutValue, newPropsWithoutValue);
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Input;

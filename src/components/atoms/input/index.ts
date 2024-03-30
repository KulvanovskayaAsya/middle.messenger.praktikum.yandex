import BaseComponent from '../../../utils/base-component';
import { Props } from '../../../utils/base-component';
import './input.scss';
import template from './input.hbs?raw';

import validate from '../../../utils/validation';
// import isObjectsEqual from '../../../utils/object-comparing';

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
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          console.log(target.value)
          
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

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Input;

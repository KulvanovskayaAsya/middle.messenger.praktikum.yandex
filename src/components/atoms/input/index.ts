import BaseComponent from '../../../utils/base-component';
import './input.scss';
import template from './input.hbs?raw';

import validate from '../../../utils/validation';

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
          console.log('oninput value = ', target.value)
          
          if (target) {
            console.log('input set props: ', {
              ...this.props,
              value: target.value,
            })
            this.setProps({
              ...this.props,
              value: target.value,
            });
          }
        },
        blur: (event: Event) => this.handleInputBlur(event)
      },
    });
  }

  handleInputBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    console.log(target);

    if (target && target.name && target.value) {
      const validationResult = validate(target.name, target.value);

      console.log(validationResult);
      if (!validationResult.isValid) {
        this.setProps({
          ...this.props,
          additionalClasses: `${this.props.additionalClasses ? `${this.props.additionalClasses} ` : ''}input_invalid`,
        });
        console.log('need add invalid class', this.props)
      } else {
        let updatedClasses: string = '';
        if (typeof this.props.additionalClasses === 'string') updatedClasses = (this.props.additionalClasses || '').replace('input_invalid', '').trim();

        this.setProps({
          ...this.props,
          additionalClasses: updatedClasses,
        });
      }
    }
  }

  render(): HTMLElement {
    console.log('render props: ', this.props)
    return this.compile(template, this.props);
  }
}

export default Input;

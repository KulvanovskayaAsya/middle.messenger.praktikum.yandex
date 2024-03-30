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
      // events: {
      //   input: (event: Event) => {
      //     const target = event.target as HTMLInputElement;
      //     if (target) {
      //       this.setProps({
      //         ...this.props,
      //         value: target.value,
      //       });

      //       console.log(this.props);
      //     }
      //   },
      //   blur: (event: Event) => this.onBlurValidation(event),
      // },
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }

  // override componentDidUpdate(oldProps: Props, newProps: Props): boolean {
  //   if (oldProps.value !== newProps.value) {
  //     this.setProps({ value: newProps.text });
  //   }

  //   return isObjectsEqual(oldProps, newProps);
  // }

  onBlurValidation(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target && target.name && target.value) {
      const validationResult = validate(target.name, target.value);

      console.log(validationResult);
      if (!validationResult.isValid) {
        this.setProps({
          ...this.props,
          additionalClasses: `${this.props.additionalClasses ? `${this.props.additionalClasses} ` : ''}input_invalid`,
        });
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
}

export default Input;

import BaseComponent, {Props} from '../../../utils/base-component';
import './input.scss';
import template from './input.hbs?raw';

import validate from '../../../utils/validation';
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
        input: (event: Event) => {
          const target = event.target as HTMLInputElement;
          
          if (target) {
            this.setProps({
              ...this.props,
              value: target.value,
            });
          }
        },
        blur: (event: Event) => this.handleInputBlur(event),
      },
    });
  }

  handleInputBlur(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target && target.name && target.value) {
      const validationResult = validate(target.name, target.value);

      if (!validationResult.isValid) {
        this.setProps({
          ...this.props,
          additionalClasses: `${this.props.additionalClasses ? `${this.props.additionalClasses} ` : ''}input_invalid`,
        });
        console.log(validationResult.message);
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

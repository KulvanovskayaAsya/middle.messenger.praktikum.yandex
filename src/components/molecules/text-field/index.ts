import BaseComponent from '../../../utils/base-component';
import './text-field.scss';
import template from './text-field.hbs?raw';

import validate from '../../../utils/validation';

import Input, { IInputProps } from '../../atoms/input';
import Label, { ILabelProps } from '../../atoms/label';

export interface ITextFieldProps {
  input: IInputProps;
  label: ILabelProps;
  additionalClasses?: string;
  errorMessage?: string;
}

class TextField extends BaseComponent {
  constructor(props: ITextFieldProps) {
    super({
      ...props,
      input: new Input({ 
        ...props.input,
        additionalClasses: 'text-field__input',
        events: {
          blur: (event: Event) => this.handleInputBlur(event),
        },
      }),
      label: new Label({ ...props.label, additionalClasses: 'text-field__label' }),
    });
  }

  handleInputBlur(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target && target.name && target.value) {
      const validationResult = validate(target.name, target.value);
      const childInput = this.children.input;

      this.setProps({
        ...this.props,
        errorMessage: validationResult.message,
      });

      if (!validationResult.isValid) {
        childInput.setProps({
          ...childInput.props,
          additionalClasses: `${childInput.props.additionalClasses ? `${childInput.props.additionalClasses} ` : ''}input_invalid`,
        });
        console.log(validationResult.message);
      } else {
        let updatedClasses: string = '';
        if (typeof childInput.props.additionalClasses === 'string') updatedClasses = (childInput.props.additionalClasses || '').replace('input_invalid', '').trim();

        childInput.setProps({
          ...childInput.props,
          additionalClasses: updatedClasses,
        });
      }
    }
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default TextField;

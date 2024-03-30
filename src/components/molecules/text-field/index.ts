import BaseComponent from '../../../utils/base-component';
import './text-field.scss';
import template from './text-field.hbs?raw';

import Input, { IInputProps } from '../../atoms/input';
import Label, { ILabelProps } from '../../atoms/label';

export interface ITextFieldProps {
  input: IInputProps;
  label: ILabelProps;
}

class TextField extends BaseComponent {
  constructor(props: ITextFieldProps) {
    super({
      ...props,
      input: new Input({ ...props.input, additionalClasses: 'text-field__input' }),
      label: new Label({ ...props.label, additionalClasses: 'text-field__label' }),
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default TextField;

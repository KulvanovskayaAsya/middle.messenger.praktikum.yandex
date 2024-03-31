import BaseComponent from '../../../utils/base-component';
import './button.scss';
import template from './button.hbs?raw';

export interface IButtonProps {
  text?: string;
  icon?: string;
  additionalClasses?: string;
  hrefPage?: string;
  isDisabled?: boolean;
  events?: Record<string, (e: Event) => void>;
}

class Button extends BaseComponent {
  constructor(props: IButtonProps) {
    super(props);
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Button;

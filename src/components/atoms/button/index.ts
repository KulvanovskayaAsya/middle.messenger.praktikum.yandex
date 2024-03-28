import BaseComponent from '../../../utils/base-component';
import './button.scss';
import template from './button.hbs?raw';

interface IButtonProps {
  text?: string;
  icon?: string;
  additionalClasses?: string;
  hrefPage?: string;
  onClick?: () => void;
}

class Button extends BaseComponent {
  constructor(props: IButtonProps) {
    super({ 
			...props, 
			events: { 
				click: props.onClick
			} 
		});
  }

  render(): string {
    return this.compile(template, this.props);
  }
}

export default Button;

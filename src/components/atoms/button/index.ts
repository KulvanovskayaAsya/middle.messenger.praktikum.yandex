import BaseComponent from '../../../utils/base-component';
import './button.scss';
import template from './button.hbs?raw';

import Router from '../../../router';

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
    super({
      ...props,
      events: {
        click: () => {
          if(props.hrefPage)
            Router.go(props.hrefPage);
        },
      }
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Button;

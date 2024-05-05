import BaseComponent, { IProps } from '@utils/base-component';
import './button.scss';
import template from './button.hbs?raw';

import router from '@/router';

export interface IButtonProps extends IProps {
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
        ...props.events,
        click: () => {
          if (props.hrefPage)
            router.go(props.hrefPage);
        },
      },
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Button;

import BaseComponent from '@/utils/base-component';
import './link.scss';
import template from './link.hbs?raw';

import Router from '@/router';

export interface ILinkProps {
  hrefPage: string,
  text: string,
  additionalClasses?: string
}

class Link extends BaseComponent {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: () => {
          Router.go(props.hrefPage);
        },
      }
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Link;

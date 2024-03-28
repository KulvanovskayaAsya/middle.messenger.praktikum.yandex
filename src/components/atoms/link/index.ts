import BaseComponent from '../../../utils/base-component';
import './link.scss';
import template from './link.hbs?raw';

interface ILinkProps {
  link: string,
  text: string,
  additionalClasses?: string,
  hrefPage: string
}

class Link extends BaseComponent {
  constructor(props: ILinkProps) {
    super(props);
  }

	render() {
    return this.compile(template, this.props);
  }
}

export default Link;

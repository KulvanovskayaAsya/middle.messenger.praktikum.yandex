import BaseComponent from '../../../utils/base-component';
import './page-title.scss';
import template from './page-title.hbs?raw';

export interface IPageTitleProps {
  text: string,
  additionalClasses?: string
}

class PageTitle extends BaseComponent {
  constructor(props: IPageTitleProps) {
    super(props);
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default PageTitle;

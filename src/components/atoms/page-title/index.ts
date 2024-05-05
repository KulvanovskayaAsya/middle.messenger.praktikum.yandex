import BaseComponent, { IProps } from '@utils/base-component';
import './page-title.scss';
import template from './page-title.hbs?raw';

export interface IPageTitleProps extends IProps {
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

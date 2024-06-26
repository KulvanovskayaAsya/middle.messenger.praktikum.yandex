import BaseComponent, { IProps } from '@utils/base-component';
import './error404.scss';
import template from './error404.hbs?raw';
import Link from '@components/atoms/link';

interface IErrorPageProps extends IProps {
  backLink: Link;
  errorImgSrc: string;
}

class ErrorPage404 extends BaseComponent {
  constructor(props: IErrorPageProps) {
    super({
      ...props,
      backLink: new Link({
        hrefPage: '/messenger',
        text: 'Вернуться к чатам',
        additionalClasses: 'link_back error-page-wrapper__link',
      }),
      errorImgSrc: 'images/error404.svg',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ErrorPage404;

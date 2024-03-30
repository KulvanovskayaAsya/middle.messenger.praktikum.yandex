import BaseComponent from '../../utils/base-component';
import './error500.scss';
import template from './error500.hbs?raw';
import Link from '../../components/atoms/link';

interface IErrorPageProps {}

class ErrorPage500 extends BaseComponent {
  constructor(props: IErrorPageProps) {
    super({
      ...props,
    backLink: new Link({
      hrefLink: '#',
      hrefPage: 'chatPage',
      text: 'Вернуться к чатам',
      additionalClasses: 'link_back error-page-wrapper__link'
    }),
    errorImgSrc: 'images/error500.svg'
  });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ErrorPage500;

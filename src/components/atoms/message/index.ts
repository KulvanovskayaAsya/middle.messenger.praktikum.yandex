import BaseComponent, { IProps } from '@utils/base-component';
import './message.scss';
import template from './message.hbs?raw';

export interface IMessageProps extends IProps {
  text: string;
  date: string;
  mediaSrc?: string;
  mediaAlt?: string;
}

class Message extends BaseComponent {
  constructor(props: IMessageProps) {
    props.date = new Date(props.date).toLocaleString();
    super(props);
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Message;

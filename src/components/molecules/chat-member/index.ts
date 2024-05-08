import BaseComponent, { IProps } from '@utils/base-component';
import './chat-member.scss';
import template from './chat-member.hbs?raw';

import Avatar, { IAvatarProps } from '@components/atoms/avatar';
import Button, { IButtonProps } from '@/components/atoms/button';

export interface IChatMemberProps extends IProps {
  id?: number;
  avatar: IAvatarProps;
  name: string;
  actions: IButtonProps;
}

class ChatMember extends BaseComponent {
  constructor(props: IChatMemberProps) {
    super({
      ...props,
      avatar: new Avatar({ ...props.avatar }),
      actions: new Button({ ...props.actions, additionalClasses: `${props.actions.additionalClasses} chat-member__action` }),
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default ChatMember;

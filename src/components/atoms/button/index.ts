import BaseComponent from '../../../utils/base-component';
import './button.scss';
import template from './button.hbs?raw';

export interface IButtonProps {
  text?: string;
  icon?: string;
  additionalClasses?: string;
  hrefPage?: string;
  events?: Record<string, (e: Event) => void>;
}

function grabFormValues(e: Event): void {
  const buttonElement = e.currentTarget as HTMLElement;
  const form = buttonElement.closest('form');

  if (form) {
    const formData: Record<string, string> = {};
    const formElements = form.elements;
    
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    
    console.log(formData);
  } else {
    console.log('Форма не найдена');
  }
}

class Button extends BaseComponent {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => grabFormValues(e)
      }
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Button;

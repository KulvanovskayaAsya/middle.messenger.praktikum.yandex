import BaseComponent from '../../../utils/base-component';
import './button.scss';
import template from './button.hbs?raw';
import validate from '../../../utils/validation';

export interface IButtonProps {
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
        click: (event: Event) => this.handleFormSubmit(event)
      }
    });
  }

  render(): HTMLElement {
    return this.compile(template, this.props);
  }

  grabFormValues(form: HTMLFormElement): void {
    const formData: Record<string, string> = {};
    const formElements = form.elements;
    let isValidForm = false;
    
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name) {
        formData[element.name] = element.value;
        const isValidField = validate(formData[element.name], element.value).isValid;
        if(!isValidField)
          break;
      }
    }

    if(!isValidForm) {
      this.setProps({
        ...this.props,
        isDesabled: true
      })
    }

    console.log(this.props)
    
    console.log(formData);
  }

  handleFormSubmit(e: Event): void {
    const buttonElement = e.currentTarget as HTMLElement;
    const form = buttonElement.closest('form');
  
    if (form) {
      this.grabFormValues(form);
    } else {
      console.log('Форма не найдена');
    }
  }
}

export default Button;

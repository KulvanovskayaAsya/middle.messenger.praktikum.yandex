import BaseComponent from '../../../utils/base-component';
import './form.scss';

import TextField from '../../molecules/text-field';
import Button from '../../atoms/button';

import validate from '../../../utils/validation';

export interface IFormProps {
  textFields: TextField[];
  button?: Button;
}

class Form extends BaseComponent {
  constructor(props: IFormProps) {
    super(props);
  }

  grabFormValues(form: HTMLFormElement): void {
    const formData: Record<string, string> = {};
    const formElements = form.elements;
    const isValidForm = false;

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name) {
        formData[element.name] = element.value;
        const isValidField = validate(formData[element.name], element.value).isValid;
        if (!isValidField) break;
      }
    }

    if (!isValidForm) {
      console.log('isValidForm', this)
      this.children.button.setProps({
        ...this.props,
        isDisabled: true,
      });
    }

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

  render(): HTMLElement {
    const formElement = document.createElement('form');
    formElement.classList.add('form');

    if (Array.isArray(this.props.textFields)) {
      this.props.textFields.forEach((textField: BaseComponent) => {
        formElement.appendChild(textField.getContent());
      });
    }

    Object.values(this.children).forEach((child) => {
      if (child instanceof Button) {
        child.setProps({
          ...child.props,
          events: {
            click: (event: Event) => this.handleFormSubmit(event),
          }
        })
      }

      formElement.appendChild(child.getContent());
    });

    return formElement;
  }
}

export default Form;

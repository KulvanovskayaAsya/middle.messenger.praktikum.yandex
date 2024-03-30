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

  grabFormValues(form: HTMLFormElement): boolean {
    const formData: Record<string, string> = {};
    const formElements = form.elements;
    let isValidForm = true;

    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i] as HTMLInputElement;
      if (element.name) {
        formData[element.name] = element.value;
        const isValidField = validate(formData[element.name], element.value).isValid;
        if (!isValidField) {
          isValidForm = false;
        }
      }
    }

    console.log(formData);

    return isValidForm;
  }

  handleFormSubmit(e: Event): void {
    const buttonElement = e.currentTarget as HTMLElement;
    const form = buttonElement.closest('form');

    if (form) {
      const isValidForm = this.grabFormValues(form);

      if (!isValidForm) {
        this.children.button.setProps({
          isDisabled: true
        });
      }
      console.log(this.children.button.props)
    } else {
      throw new Error('Форма не найдена');
    }
  }

  handleInputBlur(e: Event) {
    const target = e.target as HTMLInputElement;
    console.log(target);

    // if (target && target.name && target.value) {
    //   const validationResult = validate(target.name, target.value);

    //   console.log(validationResult);
    //   if (!validationResult.isValid) {
    //     this.setProps({
    //       ...this.props,
    //       additionalClasses: `${this.props.additionalClasses ? `${this.props.additionalClasses} ` : ''}input_invalid`,
    //     });
    //   } else {
    //     let updatedClasses: string = '';
    //     if (typeof this.props.additionalClasses === 'string') updatedClasses = (this.props.additionalClasses || '').replace('input_invalid', '').trim();

    //     this.setProps({
    //       ...this.props,
    //       additionalClasses: updatedClasses,
    //     });
    //   }
    // }
  }

  render(): HTMLElement {
    const formElement = document.createElement('form');
    formElement.classList.add('form');

    if (Array.isArray(this.props.textFields)) {
      this.props.textFields.forEach((textField: BaseComponent) => {
        const input = textField.children.input;
        
        input.setProps({
          ...input.props,
          events: {
            blur: (event: Event) => this.handleInputBlur(event)
          }
        })

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

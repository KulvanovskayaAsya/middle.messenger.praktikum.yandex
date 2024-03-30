import BaseComponent from '../../../utils/base-component';
import './form.scss';

import TextField from '../../molecules/text-field';
import Button from '../../atoms/button';

export interface IFormProps {
  textFields: TextField[];
  button?: Button;
}

class Form extends BaseComponent {
  constructor(props: IFormProps) {
    super(props);
  }

  render(): HTMLElement {
    const formElement = document.createElement('form');
    formElement.classList.add('form');

    // всё та же проблема типизации children/props
    this.props.textFields.forEach((textField) => {
      formElement.appendChild(textField.getContent());
    });

    // Object.values(this.children).forEach((child) => {
    //   if (child instanceof Button) {
    //     if (!child.props.events) {
    //       child.props.events = {};
    //     }

    //     child.props.events.click = (e: Event) => {
    //       const buttonElement = e.currentTarget as HTMLElement;
    //       const form = buttonElement.closest("form");

    //       if (form) {
    //         const formData: Record<string, string> = {};
    //         const formElements = form.elements;

    //         for (let i = 0; i < formElements.length; i++) {
    //           const element = formElements[i] as HTMLInputElement;
    //           if (element.name) {
    //             formData[element.name] = element.value;
    //           }
    //         }

    //         console.log(formData);
    //       } else {
    //         console.log("Форма не найдена");
    //       }
    //     };
    //   }
    //   console.log(child.getContent())
    //   formElement.appendChild(child.getContent());
    // });

    Object.values(this.children).forEach((child) => {
      formElement.appendChild(child.getContent());
    });

    return formElement;
  }
}

export default Form;

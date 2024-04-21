import BaseComponent from '@utils/base-component';
import './form.scss';

import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';

import validate from '@utils/validation';

export interface IFormProps {
  textFields: TextField[];
  button?: Button;
  events?: any;
}

class Form extends BaseComponent {
  constructor(props: IFormProps) {
    super(props);
  }

  render(): HTMLElement {
    const form = document.createElement('form');
    form.classList.add('form');

    const formBtn = this.compile(`{{{button}}}`, this.props);

    if (Array.isArray(this.props.textFields)) {
      this.props.textFields.forEach((textField: BaseComponent) => {
        form.appendChild(textField.getContent());
      });
    }

    form.appendChild(formBtn);

    return form;
  }

  public grabFormValues(form: any): object {
    const formData: Record<string, string> = {};

    if(form) {
      const formElements = form._element.elements;
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
    }

    return formData;
  }
}

export default Form;

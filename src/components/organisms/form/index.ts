import BaseComponent, { IProps } from '@utils/base-component';
import './form.scss';

import TextField from '@components/molecules/text-field';
import Button from '@components/atoms/button';

import { isArray } from '@utils/type-check';

export interface IFormProps extends IProps {
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

    const formBtn = this.compile('{{{button}}}', this.props);

    if (isArray(this.props.textFields)) {
      this.props.textFields.forEach((textField: BaseComponent) => {
        form.appendChild(textField.getContent());
      });
    }

    form.appendChild(formBtn);

    return form;
  }

  public grabFormValues(form: any): object {
    const formData: Record<string, string> = {};

    if (form) {
      const formElements = form.element.elements;
  
      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i] as HTMLInputElement;
        if (element.name) {
          formData[element.name] = element.value;
        }
      }
    }

    return formData;
  }
}

export default Form;

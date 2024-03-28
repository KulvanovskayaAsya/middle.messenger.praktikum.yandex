import BaseComponent from '../../../utils/base-component';
import './form.scss';
import TextField from '../../molecules/text-field';
import Button from '../../atoms/button';

interface IFormProps {
  textFields: TextField[];
  button?: Button;
}

class Form extends BaseComponent {
  constructor(props: IFormProps) {
    super(props);
  }

  render(): HTMLElement {
    const formElement = document.createElement('div');
    formElement.classList.add('form');

    this.props.textFields.forEach((textField) => {
      formElement.appendChild(textField.getContent());
    });
    
    Object.values(this.children).forEach((child) => {
      formElement.appendChild(child.getContent());
    });

    return formElement;
  }
}

export default Form;

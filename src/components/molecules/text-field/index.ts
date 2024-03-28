import BaseComponent from "../../../utils/base-component";
import "./text-field.scss";
import template from "./text-field.hbs?raw";
import Input from "../../atoms/input";
import Label from "../../atoms/label";

interface ITextFieldProps {
  input: { 
    id: string,
    name: string,
    inputType?: string,
    additionalClasses?: string 
  },
  label: { 
    id: string, 
    label: string,
    additionalClasses?: string 
  }
}

class TextField extends BaseComponent {
  constructor(props: ITextFieldProps) {
    super({
      ...props,
      children: {
        input: new Input({ ...props.input }),
        label: new Label({ ...props.label }),
      },
      events: {
        blur: event => {
          console.log(event.target);
        }
      }
    });
  }

	public onBlur(event: Event) {
    console.log('Валидация:', event);
  }

	render(): string {
		return this.compile(template, this.props);
	}
}

export default TextField;

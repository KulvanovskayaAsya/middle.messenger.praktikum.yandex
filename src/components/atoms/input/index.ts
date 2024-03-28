import BaseComponent from "../../../utils/base-component";
import "./input.scss";
import template from "./input.hbs?raw";

interface IInputProps {
	id: string,
	additionalClasses?: string,
  inputType?: string,
  name: string
}

class Input extends BaseComponent {
  constructor(props: IInputProps) {
    super({ 
      ...props,
      events: {
        blur: event => {
          console.log(event.target);
        }
      }
    });
  }

	render() {
    return this.compile(template, this.props);
  }
}

export default Input;

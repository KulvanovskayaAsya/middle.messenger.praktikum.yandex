import BaseComponent from "../../../utils/base-component";
import "./input.scss";
import template from "./input.hbs?raw";

export interface IInputProps {
	id: string;
	additionalClasses?: string;
  inputType?: string;
  name: string;
  events?: Record<string, (e: Event) => void>;
}

class Input extends BaseComponent {
  constructor(props: IInputProps) {
    super(props);
  }

	render(): HTMLElement {
    return this.compile(template, this.props);
  }
}

export default Input;

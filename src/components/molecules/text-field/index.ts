import BaseComponent from "../../../utils/base-component";
import "./text-field.scss";
import template from "./text-field.hbs?raw";
import Input from "../../atoms/input";
import Label from "../../atoms/label";

class TextField extends BaseComponent {
  constructor(props) {
    super({
      children: {
        input: new Input({ ...props.input }),
        label: new Label({ ...props.label }),
      },
      props,
			events: {
				blur: this.onBlur.bind(this);
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

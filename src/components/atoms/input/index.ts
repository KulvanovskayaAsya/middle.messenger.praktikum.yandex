import BaseComponent from "../../../utils/base-component";
import "./input.scss";
import template from "./input.hbs?raw";

class Input extends BaseComponent {
  constructor(props) {
    super(props);
  }

	render() {
    return this.compile(template, this.props);
  }
}

export default Input;
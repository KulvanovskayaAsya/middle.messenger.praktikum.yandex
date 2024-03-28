import BaseComponent from "../../../utils/base-component";
import "./label.scss";
import template from "./label.hbs?raw";

class Label extends BaseComponent {
  constructor(props) {
    super(props);
  }

	render() {
    return this.compile(template, this.props);
  }
}

export default Label;
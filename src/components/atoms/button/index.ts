import Block from "../../../utils/block";
import "./button.scss";
import template from "./button.hbs?raw";

interface ButtonProps {
  text?: string;
  icon?: string;
  additionalClasses?: string;
  hrefPage?: string;
  onClick?: () => void;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", { 
			...props, 
			events: { 
				click: props.onClick
			} 
		});
  }

  render(): string {
    const temp = Handlebars.compile(template);
    return temp(this.props);
  }
}

export default Button;

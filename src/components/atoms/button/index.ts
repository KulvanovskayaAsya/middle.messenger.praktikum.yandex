import Block from "../../../utils/block";
import "./button.scss";
import template from "./button.hbs?raw";

interface IButtonProps {
  text?: string;
  icon?: string;
  additionalClasses?: string;
  hrefPage?: string;
  onClick?: () => void;
}

class Button extends Block {
  constructor(props: IButtonProps) {
    super({ 
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

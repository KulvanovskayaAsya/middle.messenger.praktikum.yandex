import BaseComponent from '../../../utils/base-component';
import './label.scss';
import template from './label.hbs?raw';

interface ILabelProps {
  id: string,
  additionalClasses?: string,
  label: string
}

class Label extends BaseComponent {
  constructor(props: ILabelProps) {
    super(props);
  }

	render() {
    return this.compile(template, this.props);
  }
}

export default Label;

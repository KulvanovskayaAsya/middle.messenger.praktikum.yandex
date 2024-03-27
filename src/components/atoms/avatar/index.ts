import BaseComponent from '../../../utils/baseComponent';
import './avatar.scss';
import template from './avatar.hbs?raw';

interface IAvatarProps {
	src: string,
	additionalClasses?: string
}

class Avatar extends BaseComponent {
	constructor(props: IAvatarProps) {
		super(props);
	}

	render() {
		return this.compile(template, this.props);
	}
}

export default Avatar;

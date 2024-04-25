import { isArray } from '@utils/type-check';
import BaseComponent from '@utils/base-component';
import './list.scss';

export interface IListProps {
  list: BaseComponent[];
}

class List extends BaseComponent {
  constructor(props: IListProps) {
    console.log('IListProps', props);
    super(props);
  }

  render(): HTMLElement {
    console.log('render', this.props)
    const elementsList = document.createElement('section');
    elementsList.classList.add('list');

    if (isArray(this.props.list)) {
      this.props.list.forEach((item: BaseComponent) => {
        console.log(item);
        // const chatItem = this.compile(`{{{chat}}}`, this.props);
        elementsList.appendChild(item.getContent());
      });
    }

    return elementsList;
  }
}

export default List;

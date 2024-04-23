import { isArray } from '@utils/type-check';
import BaseComponent from '@utils/base-component';
import './list.scss';

export interface IListProps {
  list: BaseComponent[];
}

class List extends BaseComponent {
  constructor(props: IListProps) {
    super(props);
  }

  render(): HTMLElement {
    const elementsList = document.createElement('section');
    elementsList.classList.add('list');

    if (isArray(this.props.list)) {
      this.props.list.forEach((item: BaseComponent) => {
        elementsList.appendChild(item.getContent());
      });
    }

    return elementsList;
  }
}

export default List;

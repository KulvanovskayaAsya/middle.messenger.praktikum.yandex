import BaseComponent from '../../../utils/base-component';
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

    // опять же не выходит типизировать
    this.props.list.forEach((item: BaseComponent) => {
      elementsList.appendChild(item.getContent());
    });

    return elementsList;
  }
}

export default List;

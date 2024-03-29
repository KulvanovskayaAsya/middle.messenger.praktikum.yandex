import BaseComponent from '../../../utils/base-component';
import './list.scss';

interface IListProps {
  [key: string]: BaseComponent[];
}

class List extends BaseComponent {
  constructor(props: IListProps) {
    super(props);
  }

  render(): HTMLElement {
    const elementsList = document.createElement('section');
    elementsList.classList.add('list');

    this.props.list.forEach((item) => {
      elementsList.appendChild(item.getContent());
    });

    return elementsList;
  }
}

export default List;

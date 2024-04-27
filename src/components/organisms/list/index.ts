import { isArray } from '@utils/type-check';
import BaseComponent from '@utils/base-component';
import './list.scss';

export interface IListProps {
  list: BaseComponent[];
}

class List extends BaseComponent {
  dependsOnProps(): string[] {
    return ['chats'];
  }

  constructor(props: IListProps) {
    console.log('list constructor props = ', props);
    super(props);
  }
  render(): HTMLElement {
    console.log('list render props = ', this.props);
    const elementsList = document.createElement('section');
    elementsList.classList.add('list');

    if (isArray(this.props.list)) {
      this.props.list.forEach((item: BaseComponent) => {
        console.log(item)
        elementsList.appendChild(item.getContent());
      });
    }

    return elementsList;
  }
}

export default List;

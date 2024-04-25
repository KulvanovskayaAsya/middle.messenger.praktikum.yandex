import { isArray } from '@utils/type-check';
import BaseComponent, { Props } from '@utils/base-component';
import './list.scss';
import isEqual from '@/utils/object-comparing';

export interface IListProps {
  list: BaseComponent[];
}

class List extends BaseComponent {
  constructor(props: IListProps) {
    super(props);
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const shouldUpdate = !isEqual(oldProps.list, newProps.list);
    return shouldUpdate;
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

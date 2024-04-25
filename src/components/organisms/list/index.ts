import { isArray } from '@utils/type-check';
import BaseComponent, { Props } from '@utils/base-component';
import './list.scss';
import isEqual from '@/utils/object-comparing';

export interface IListProps {
  list: BaseComponent[];
}

class List extends BaseComponent {
  constructor(props: IListProps) {
    console.log('IListProps', props);
    super(props);
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    console.log('List componentDidUpdate ', oldProps, newProps);
    const shouldUpdate = !isEqual(oldProps.list, newProps.list);
    return shouldUpdate;
  }

  render(): HTMLElement {
    console.log('List render', this.props, this.children)
    const elementsList = document.createElement('section');
    elementsList.classList.add('list');

    if (isArray(this.props.list)) {
      this.props.list.forEach((item: BaseComponent) => {
        console.log(item);
        elementsList.appendChild(item.getContent());
      });
    }

    return elementsList;
  }
}

export default List;

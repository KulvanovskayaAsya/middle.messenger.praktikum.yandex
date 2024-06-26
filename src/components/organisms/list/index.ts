import { isArray } from '@utils/type-check';
import BaseComponent, { IProps } from '@utils/base-component';
import './list.scss';

export interface IListProps extends IProps {
  list: object[];
}

export interface IListFactory {
  getListItemComponent(props: unknown): BaseComponent;
}

class List extends BaseComponent {
  private _factory: IListFactory;

  constructor(props: IListProps, listFactory: IListFactory) {
    super(props);

    this._factory = listFactory;
  }

  render(): HTMLElement {
    const elementsList = document.createElement('section');
    elementsList.classList.add('list');

    if (isArray(this.props.list) && this._factory) {
      this.props.list.map((item) => {
        const element = this._factory.getListItemComponent(item);
        elementsList.appendChild(element.getContent());
      });
    }

    return elementsList;
  }
}

export default List;

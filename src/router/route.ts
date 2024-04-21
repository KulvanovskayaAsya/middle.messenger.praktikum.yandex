import BaseComponent from '../utils/base-component';
import isEqual from '../utils/object-comparing';

interface IPage {
  getContent: () => HTMLElement;
}

interface IPageConstructor {
  new(args?: any): IPage;
}

function render(query: string, block: BaseComponent): HTMLElement | null {
  const root = document.querySelector(query);
  if (root) {
    root.textContent = '';
    root.appendChild(block.getContent());
  }
  
  return root as HTMLElement;
}

interface RouteProps {
  rootQuery: string;
}

class Route {
  private _pathname: string;
  private _componentName: IPageConstructor;
  private _block: BaseComponent | null;
  private _props: RouteProps;
  
  constructor(pathname: string, view: IPageConstructor, props: RouteProps) {
    this._pathname = pathname;
    this._componentName = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._componentName();
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;

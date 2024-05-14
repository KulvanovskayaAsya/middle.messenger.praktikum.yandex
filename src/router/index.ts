import Route from './route.ts';
import BaseComponent from '../utils/base-component.ts';
import AuthorizationService from '../services/authorization-service/index.ts';

interface IPageConstructor {
  new(args?: unknown): BaseComponent;
}

class Router {
  private _routes: Route[] = [];

  private _history: History = window.history;

  private _currentRoute: Route | null = null;

  private _rootQuery: string = '';

  constructor(rootQuery: string) {   
    this._rootQuery = rootQuery;
  }

  public get routes() {
    return this._routes;
  }

  public use(pathname: string, block: IPageConstructor): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this._routes.push(route);
    return this;
  }

  public async start(): Promise<void> {
    window.addEventListener('popstate', () => {
      this._onRoute(window.location.pathname);
    });
    
    this._onRoute(window.location.pathname);

    try {
      await AuthorizationService.updateProfileInfo();
    } catch (error) {
      this.go('/');
    }
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    
    if (!route) {
      this.go('/404');
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this._history.back();
  }

  forward(): void {
    this._history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    return this._routes.find(route => route.match(pathname));
  }
}

export default new Router('#app');

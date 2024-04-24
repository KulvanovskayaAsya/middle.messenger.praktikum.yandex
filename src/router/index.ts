import Route from '@/router/route';
import store from '@/store';

interface IPage {
  getContent: () => HTMLElement;
}

interface IPageConstructor {
  new(args?: any): IPage;
}

class Router {
  private static _instance: Router;

  private _routes: Route[] = [];
  private _history: History = window.history;
  private _currentRoute: Route | null = null;
  private _rootQuery: string = '';

  constructor(rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }
    
    this._rootQuery = rootQuery;

    Router._instance = this;
  }

  // private _isAuthenticated() {
  //   const profileInfo = store.getState().profileInfo;
  //   return profileInfo && Object.keys(profileInfo).length > 0;
  // }

  public use(pathname: string, block: IPageConstructor): Router {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this._routes.push(route);
    return this;
  }

  public start(): void {
    window.addEventListener('popstate', () => {
      this._onRoute(window.location.pathname);
    });
    
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    console.log(pathname, route)
    
    if (!route) {
      this.go('/404');
      return;
    }

    // if (pathname !== '/' && !this._isAuthenticated()) {
    //   this.go('/');
    //   return;
    // }

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

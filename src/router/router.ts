import BaseComponent from "../utils/base-component";
import Route from "./route";

class Router {
  private static _instance: Router;

  private _routes: Route[];
  private _history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }

    this._routes = [];
    this._history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router._instance = this;
  }

  use(pathname: string, block: new() => BaseComponent): Router {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this._routes.push(route);
    return this;
  }

  start(): void {
    window.addEventListener("popstate", () => {
      this._onRoute(window.location.pathname);
    });
    
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    
    if (!route) {
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

export default Router;

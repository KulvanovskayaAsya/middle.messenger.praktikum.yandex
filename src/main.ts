import Router from './router';
import routes from './router/routes';

document.addEventListener('DOMContentLoaded', () => {
  Object.values(routes).forEach(({ path, component }) => {
    Router.use(path, component);
  });

  Router.start();
});

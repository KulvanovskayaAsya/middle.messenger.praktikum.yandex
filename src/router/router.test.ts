// import BaseComponent from '@/utils/base-component';
import { expect } from 'chai';
// import sinon from 'sinon';
// import Router from './index.ts';

// class TestPage1 extends BaseComponent {
//   constructor() {
//     super({});
//   }

//   render() {
//     const testPageContent = document.createElement('div');
//     testPageContent.classList.add('test-page-1');

//     return testPageContent;
//   }
// }

// class TestPage2 extends BaseComponent {
//   constructor() {
//     super({});
//   }

//   render() {
//     const testPageContent = document.createElement('div');
//     testPageContent.classList.add('test-page-2');

//     return testPageContent;
//   }
// }

describe('Router', () => {
  // const router = Router;

  // it('should redirect to / if user is unauthorized', () => {

  // });

  // it('should redirect to /404 if no matching route', () => {
  //   const pushStateSpy = sinon.spy(history, 'pushState');
  //   router.go('/non-existing-route');
  //   expect(pushStateSpy.calledWith({}, '', '/404')).to.be.true;
  // });
  it('Переход на новую страницу должен менять состояние сущности history', () => {
    window.history.pushState({page: 'login'}, 'Login', '/login');
    window.history.pushState({page: 'register'}, 'Register', '/register');

    expect(window.history.length).to.eq(3);
  });
}); 

import { expect } from 'chai';
import sinon from 'sinon';
import Router from './index.ts';
import BaseComponent from '../utils/base-component.ts';

class TestPage1 extends BaseComponent {
  constructor() {
    super({});
  }

  render() {
    const testPageContent = document.createElement('div');
    testPageContent.classList.add('test-page-1');

    return testPageContent;
  }
}

class TestPage2 extends BaseComponent {
  constructor() {
    super({});
  }

  render() {
    const testPageContent = document.createElement('div');
    testPageContent.classList.add('test-page-2');

    return testPageContent;
  }
}

describe('Router', () => {
  let router: typeof Router;

  beforeEach(() => {
    router = Router;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should add a new routes correctly', () => {
    const initialLength = router.routes.length;

    router.use('/test1', TestPage1);
    router.use('/404', TestPage2);

    expect(router.routes.length).to.equal(initialLength + 2);
  });

  describe('start()', () => {
    it('should add event listener for popstate', () => {
      const addEventListenerSpy = sinon.spy(window, 'addEventListener');

      router.start();
      
      expect(addEventListenerSpy.calledWith('popstate')).to.be.true;
    });

    it('should call first page render', () => {
      router.start();

      expect(document.getElementsByClassName('test-page-1')).to.be.not.null;
    });
  });

  describe('history navigation', () => {
    it('go() should change the current route and update history', () => {
      const pushStateSpy = sinon.spy(history, 'pushState');

      router.go('/test');

      expect(pushStateSpy.calledWith({}, '', '/test')).to.be.true;
    });

    it('back() should call history back (-1)', () => {
      const backSpy = sinon.spy(history, 'back');

      router.back();

      expect(backSpy.called).to.be.true;
    });

    it('forward() should call history forward (+1)', () => {
      const forwardSpy = sinon.spy(history, 'back');

      router.back();
      router.forward();

      expect(forwardSpy.called).to.be.true;
    });  
  });

  it('should redirect to /404 if no matching route', () => {
    const pushStateSpy = sinon.spy(history, 'pushState');

    router.go('/non-existing-route');
    
    expect(pushStateSpy.calledWith({}, '', '/404')).to.be.true;
  });
}); 

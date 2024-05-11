import { expect } from 'chai';
import BaseComponent, { IProps } from './base-component.ts';
import sinon from 'sinon';

describe('Base component', function () {
  class TestComponent extends BaseComponent {
    constructor(props: IProps) {
      super(props);
    }

    public render(): HTMLElement {
      const template = `
        <div>
          {{{ title }}}
          {{{ text }}}
        </div>
      `;

      return this.compile(template, this.props);
    }
  }

  const testComponentTitle = {
    title: 'Test title',
  };

  const testComponentText = {
    title: 'Test text',
  };

  let component: TestComponent;

  beforeEach(() => {
    component = new TestComponent(testComponentTitle);
  });
  
  afterEach(() => {
    sinon.restore();
  });

  describe('Component instance creation', () => {
    it('should properly initialize children', () => {
      expect(component.children).to.be.deep.equal({});
    });

    it('should properly props initialize', () => {
      expect(component.props).to.be.deep.equal(testComponentTitle);
    });
  });


  it('should call componentDidMount on component mount event', () => {
    const componentDidMountSpy = sinon.spy(component, 'componentDidMount');
    component.getEventBus().emit(BaseComponent.LIFECICLE_EVENTS.FLOW_CDM);
    sinon.assert.calledOnce(componentDidMountSpy);
  });

  it('setProps should update component props', () => {
    const oldProps = {
      ...component.props,
    };

    component.setProps({
      ...oldProps,
      ...testComponentText,
    });

    expect(component.props).to.be.deep.equal({ ...testComponentTitle, ...testComponentText });
  });
  
  it('should component render work from props and template', () => {
    const componentHTML = component.getContent()?.innerHTML;

    expect(componentHTML).to.include('Test title');
  });

  describe('change displaing methods', () => {
    it('show() should display the component', () => {
      component.show();
      expect(component.element?.style.display).to.be.equal('block');
    });
    
    it('hide() should hide() the component', () => {
      component.hide();
      expect(component.element?.style.display).to.be.equal('none');
    });
  });
});

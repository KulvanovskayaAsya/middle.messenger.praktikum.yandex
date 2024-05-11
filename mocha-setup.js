import { JSDOM } from 'jsdom';
import sinon from 'sinon';

const jsdom = new JSDOM('<body></body>', {
  url: 'http://localhost:3000/'
});

global.window = jsdom.window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.history = window.history;
global.Node = window.Node;

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

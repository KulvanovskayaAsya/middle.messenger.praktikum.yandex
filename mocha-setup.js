import { JSDOM } from 'jsdom';
import sinon from 'sinon';

const jsdom = new JSDOM('<body></body>', {
  url: 'http://localhost:3000/'
});

global.window = jsdom.window;
global.document = jsdom.document;
global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

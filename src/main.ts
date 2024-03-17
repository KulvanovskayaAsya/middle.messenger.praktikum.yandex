import Handlebars from 'handlebars';
import * as Components from './atoms/index';

import addUser from './assets/icons/addUser.svg?raw';

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function renderButton(text?: string, additionalClasses?: string, icon?: string) {
  const template = Handlebars.compile(Components.Button);
  const html = template({ text, additionalClasses, icon });
  const container = document.getElementById('app');
  if (container) {
    container.innerHTML += html;
  }
}

function renderInput(placeholder?: string) {
  const template = Handlebars.compile(Components.Input);
  const html = template({ placeholder });
  const container = document.getElementById('app');
  if (container) {
    container.innerHTML += html;
  }
}


renderButton('Нажми меня', 'button_primary', addUser);
renderInput();
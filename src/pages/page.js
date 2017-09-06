'use strict';

import handlebars from 'handlebars';

const DEFAULT_SELECTOR = '#page';

class Page {
  constructor(url = '', content = '', selector = DEFAULT_SELECTOR, data = '') {
    this.url = url;
    this.content = content;
    this.selector = selector;
    this.data = data;
  }

  whenPageRendered() {
    return true;
  }

  whenRenderError() {
    let selector = document.querySelector(DEFAULT_SELECTOR);
    selector.innerHTML = '<h1>Page not found!</h1>';
  }

  render(){
    let parentElement = document.querySelector(this.selector);
    let html = handlebars.compile(this.content)(this.data);

    let promise = new Promise((resolve, reject) => {
      parentElement.innerHTML = html;
      resolve('OK');
    });

    promise
      .then(
        result => {
          this.whenPageRendered();
        },
        error => {
          this.whenRenderError();
        }
      );
  }
}

export default Page;
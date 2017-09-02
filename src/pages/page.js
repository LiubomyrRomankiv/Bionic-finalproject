'use strict';

const DEFAULT_SELECTOR = '#page';


class Page {
  constructor(url = '', content = '', selector = DEFAULT_SELECTOR) {
    this.url = url;
    this.content = content;
    this.selector = selector;
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

    let promise = new Promise((resolve, reject) => {
      
      parentElement.innerHTML = this.content;
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
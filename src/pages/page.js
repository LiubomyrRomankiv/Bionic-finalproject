'use strict';

import handlebars from 'handlebars';
import user from 'user';

const DEFAULT_SELECTOR = '#page';
const DEFAULT_STATUS = {
  guest: true,
  user: true,
  admin: true
};

class Page {
  constructor(url = '', content = '', selector = DEFAULT_SELECTOR, data = '', userStatus = DEFAULT_STATUS) {
    this.url = url;
    this.content = content;
    this.selector = selector;
    this.data = data;
    this.userStatus = userStatus;
  }

  whenPageRendered() {
    return true;
  }

  whenRenderError() {
    let selector = document.querySelector(DEFAULT_SELECTOR);
    selector.innerHTML = '<h1>Page not found!</h1>';
  }

  canActivate() {
    let status = user.getStatus();
    return _.isMatch(this.userStatus, status);
  }

  render() {
    let showPage = this.canActivate();
    if(showPage) {
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
    } else {
      this.whenRenderError();
    }
  }
}

export default Page;
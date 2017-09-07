'use strict';

import _ from 'lodash';

import homePage from './pages/home/home.page';
import loginPage from './pages/login/login.page';
import testPage from './pages/test/test.page';
import adminPage from './pages/admin/admin.page';

import user from './user';

let pages = [homePage, loginPage, testPage, adminPage];

let init = () => {
  let url = window.location.hash;
  renderPage(url);
};

let renderPage = (hash) => {
  let page = _.find(pages, {url: hash});
  page ? page.render() : homePage.render();
};

let redirectToPage = (href) => {
  renderPage(href);
  window.location.href = href;

  // let pageMenuItem = document.querySelector('.menu-item[href="'+href+'"]');
  // menu.drawActiveMenuItems( pageMenuItem );
}

export default { init, renderPage, redirectToPage };
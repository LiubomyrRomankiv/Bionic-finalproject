'use strict';

import _ from 'lodash';

import menu from 'menu';

import homePage from './pages/home/home.page';
import loginPage from './pages/login/login.page';
import adminPage from './pages/admin/admin.page';

let pages = [ homePage, loginPage, adminPage ];

let init = () => {
  let url = window.location.hash;
  renderPage(url);
};

let renderPage = (hash) => {
  let page = _.find(pages, {url: hash});
  page ? page.render() : homePage.render();
  // menu.drawActiveMenuItems(hash);
};

let redirectToPage = (hash) => {
  renderPage(hash);
  window.location.href = hash;
}

export default { init, renderPage, redirectToPage };
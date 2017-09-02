'use strict';

import _ from 'lodash';
import homePage from './pages/home/home.page';
import aboutPage from './pages/about/about.page';
import loginPage from './pages/login/login.page';
import contactsPage from './pages/contacts/contacts.page';
import adminPage from './pages/admin/admin.page';

import menu from './menu';
import user from './user';

// let pages = [homePage, aboutPage, loginPage, contactsPage, adminPage];
let adminPages = [homePage, aboutPage, contactsPage, adminPage];
let loginedUserPages = [homePage, aboutPage, contactsPage];
let unLoginedUserPages = [homePage, loginPage];

let pages = unLoginedUserPages;

let init = () => {
  let url = window.location.hash;

  renderPage(url);
};

let renderPage = (hash) => {
  let status = user.getStatus();
  let menuFilter = {guest: true};

  if ( status === 'admin' ){
    pages = adminPages;
    menuFilter = {admin: true};
  }
  if ( status === 'user' ){
    pages = loginedUserPages;
    menuFilter = {user: true};
  }
  if ( status === 'guest' ){
    pages = unLoginedUserPages;
    menuFilter = {guest: true};
  }

  let page = _.find(pages, {url: hash});

  menu.init(menuFilter);

  page ? page.render() : homePage.render();
};

let redirectToPage = (href) => {
  renderPage(href);
  window.location.href = href;
  let pageMenuItem = document.querySelector('.menu-item[href="'+href+'"]');
  menu.drawActiveMenuItems( pageMenuItem );
}

export default { init, renderPage, redirectToPage };
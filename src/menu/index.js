'use strict';

import _ from 'lodash';
import handlebars from 'handlebars';

import router from '../router';
import user from '../user';
import menuTemplate from './menu.html';
import menuItemsList from './menu.json';

const DEFAULT_MENU_SELECTOR = '#nav-menu';
const DEFAULT_MENU_TEMPLATE = menuTemplate;
const DEFAULT_MENU_DATA = menuItemsList;

class Menu {
  constructor(user = 'guest', content = DEFAULT_MENU_TEMPLATE, selector = DEFAULT_MENU_SELECTOR, data = DEFAULT_MENU_DATA) {
    this.user = user;
    this.selector = selector;
    this.content = content;
    this.data = {
      menu: data
    };
  }

  drawActiveMenuItems(item) {
    let menu = document.querySelector(this.selector);
    let activeMenuItem = menu.querySelector('.active');

    if(!!activeMenuItem){
      activeMenuItem.classList.remove('active');
    }

    if(!!item){
      item.classList.add('active');
    } else {
      this.drawActiveMenuItemsHash(menu);
    }
  };

  drawActiveMenuItemsHash(menu) {
    let menuItems = menu.querySelectorAll('.menu-item a');
    let hash = location.hash;
    if(hash === ''){
      hash = '#/'
    }
    let active = _.find(menuItems, (item) => {
      let href = item.getAttribute('href');
      return href === hash;
    });
    active.classList.add('active');
  }

  init() {
    let menu = document.querySelector(this.selector);

    menu.addEventListener('click', (e) => {
      let hash = e.target.getAttribute('href');
      router.renderPage(hash);
      this.drawActiveMenuItems(e.target);
    }, true);
  }

  render() {
    let parentElement = document.querySelector(this.selector);
    let html = handlebars.compile(this.content)(this.data);
    parentElement.innerHTML = html;

    this.init();
    this.drawActiveMenuItems();
  }
}

export default Menu;
'use strict';

import _ from 'lodash';
import handlebars from 'handlebars';

import router from 'router';
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

  drawActiveMenuItems(hash) {
    let menu = document.querySelector(this.selector);
    let activeMenuItem = menu.querySelector('.active');

    if(!!activeMenuItem){
      activeMenuItem.classList.remove('active');
    }

    this.drawActiveMenuItemsHash(menu, hash);
  };

  drawActiveMenuItemsHash(menu, hash) {
    let menuItems = menu.querySelectorAll('.menu-item a');
    let activeItemHash;
    
    if(!hash){
      activeItemHash = window.location.hash;
    } else {
      activeItemHash = hash;
    }

    if(activeItemHash === ''){
      activeItemHash = '#/'
    }

    let active = _.find(menuItems, (item) => {
      let href = item.getAttribute('href');
      return href === activeItemHash;
    });
    active.classList.add('active');
  }

  init() {
    this.render();
    this.drawActiveMenuItems();
    let menu = document.querySelector(this.selector);

    menu.addEventListener('click', (e) => {
      let hash = e.target.getAttribute('href');
      router.renderPage(hash);
      this.drawActiveMenuItems(hash);
    }, true);
  }

  render() {
    let parentElement = document.querySelector(this.selector);
    let html = handlebars.compile(this.content)(this.data);
    parentElement.innerHTML = html;
  }
}

let menu = new Menu();

export default menu;
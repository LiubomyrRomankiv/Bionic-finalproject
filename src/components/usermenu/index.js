'use strict';

import _ from 'lodash';
import handlebars from 'handlebars';

import router from 'router';
import user from 'user';
import menu from 'menu';

import menuTemplate from './usermenu.html';

const DEFAULT_USERMENU_SELECTOR = '#user-menu';
const DEFAULT_USERMENU_TEMPLATE = menuTemplate;

class UserMenu {
  constructor( content = DEFAULT_USERMENU_TEMPLATE, selector = DEFAULT_USERMENU_SELECTOR ) {
    this.selector = selector;
    this.content = content;
  }

  init() {
    this.render();

    let parentElement = document.querySelector(this.selector);
    let that = this;
    parentElement.addEventListener('click', function(e){
      let id = e.target.getAttribute('id');
      if ( id === 'logout-btn' ){
        user.removeUser();
        router.redirectToPage('/#');
        that.render();
        menu.init();
      }
    });
  }

  render() {
    let parentElement = document.querySelector(this.selector);
    let userData = user.getUserData();
    let html = '';
    if(userData){
      html = handlebars.compile(this.content)({ user: userData });
    }
    parentElement.innerHTML = html;
  }
}

let userMenu = new UserMenu();

export default userMenu;
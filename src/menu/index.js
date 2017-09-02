'use strict';

import _ from 'lodash';
import router from '../router';
import menuItemsList from './menu.json';
import user from '../user';

let createMenu = ( selectorId, filter ) => {
  let menuBlock = document.getElementById(selectorId);
  menuBlock.innerHTML = '';
  let attributes = [
    {
      name: 'id',
      val: 'menu'
    },
    {
      name: 'class',
      val: 'menu'
    }
  ];
  let menu = createElement('ul', attributes);

  let menuFilter =  _.filter( menuItemsList, filter );

  for (let i = 0; i < menuFilter.length; i++){
    let menuItem = createMenuItem( menuFilter[i], i);
    menu.appendChild(menuItem);
  }
  menuBlock.appendChild(menu);
};

let createMenuItem = (item, itemId) => {
  let attributes = [
    {
      name: 'id',
      val: 'menu-item'+itemId
    },
    {
      name: 'class',
      val: 'menu-item menu-item'+itemId
    },
    {
      name: 'href',
      val: item.link
    }
  ];

  let menuItem = createElement('li');
  let menuItemLink = createElement('a', attributes, item.text);  

  menuItem.appendChild(menuItemLink);
  return menuItem;
};

let createElement = (element, attriburtesArray, text) => {
  let newElement = document.createElement(element);
  if(!!attriburtesArray){
    for(let i = 0; i < attriburtesArray.length; i++){
      newElement.setAttribute(attriburtesArray[i].name, attriburtesArray[i].val);
    }
  }
  if(!!text){
    newElement.innerHTML = text;
  }
  return newElement;
}

let drawActiveMenuItems = (item) => {
  let menu = document.getElementById('menu');
  let activeMenuItem = menu.querySelector('.active');

  if(!!activeMenuItem){
    activeMenuItem.classList.remove('active');
  }

  if(!!item){
    item.classList.add('active');
  } else {
    drawActiveMenuItemsHash(menu);
  }
};

let drawActiveMenuItemsHash = (menu) => {
  let menuItems = menu.querySelectorAll('.menu-item');
  let hash = location.hash;
  for (let i = 0; i < menuItems.length; i++) {
    let href = menuItems[i].getAttribute('href');
    if (href === hash){
      menuItems[i].classList.add('active');
      break;
    }
  }
}

let init = (filter) => {
  createMenu( 'nav-menu', filter );
  
  let menuItems = document.querySelectorAll('#menu a');
  let activeItem = _.find(menuItems, {url: window.location.hash});
  
  drawActiveMenuItems(activeItem);

  _.each(menuItems, (item) => {
    item.addEventListener('click', function(event){
      let hash = this.getAttribute('href');
      drawActiveMenuItems(item);

      router.renderPage(hash);
    });
  });
};

export default {
  init,
  drawActiveMenuItems,
};
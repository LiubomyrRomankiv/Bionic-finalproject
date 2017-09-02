'use strict';

import users from './users';
import dom from '../dom';
import menu from '../menu';
import router from '../router';

let init = () => {
  let isUser = localStorage.getItem("user");
  if(isUser){
    setActiveUser(JSON.parse(isUser));
  }
  userMenu();
}

let getUserData = () => { return JSON.parse(localStorage.getItem("user")); };

let userAuthorization = (user, formSelector) => {
  let newActiveUser = findUser(user);
  let wraper = document.getElementById(formSelector);
  if(newActiveUser) {
    setActiveUser(newActiveUser);
    router.redirectToPage('/#');
    userMenu();
  } else {
    showMessage(wraper);
  }
}

let userUnauthorization = () => {
  let userMenuParrent = document.getElementById('user-menu');
  userMenuParrent.addEventListener('click', function(e){
    let id = e.target.getAttribute('id');
    if ( id === 'logout-btn' ){
      removeUser();
      userMenu();
      router.redirectToPage('/#');
    }
  });
}

let userMenu = () => {
  let parentElement = document.getElementById('user-menu');
  let userData = getUserData();
  if ( !!userData ){
    if (userData.name !== ''){
      parentElement.innerHTML = `<p>${userData.name}</p><button id="logout-btn" class="menu-item logout">LogOut</button>`;
      userUnauthorization();
    }
  }
   else {
    parentElement.innerHTML = '';
  }
}

let findUser = (user) => {
  for(let i = 0; i < users.length; i++){
    if(user.login === users[i].name && user.pass === users[i].password){
      return users[i];
      break;
    }
  }
  return false;
}

let showMessage = (wraper, name) => {
  let newDomElement = {};
  let attr = [];
  let text = '';

  if(!!name) {
    attr = [{ name: 'class', val: 'output good' }];
    text = 'Hello, ' + name + '. How are you?';
  } else {
    attr = [{ name: 'class', val: 'output bad' }];
    text = 'No user finded. Please, enter correct "login" and "password"';
  }
 
  newDomElement = dom.createElement('p', attr, text);
  dom.createElement('p',[{'class':'output bad'}], );
  wraper.appendChild(newDomElement);
}

let getStatus = () => {
  let userData = getUserData();
  if ( !!userData ){
    if ( userData && !!userData.name ) {
      if (userData.admin === true) {
        return 'admin';
      }
      return 'user';
    }
  }
  return 'guest';
}

let getActiveUser = () => {
  return getUserData();
}

let setActiveUser = (user) => {
  let newUser = JSON.stringify(user);
  localStorage.setItem("user", newUser);
}

let removeUser = () => {
  localStorage.removeItem("user");
  init();
}

export default { 
  userAuthorization,
  getStatus,
  getActiveUser,
  userMenu,
  init
}
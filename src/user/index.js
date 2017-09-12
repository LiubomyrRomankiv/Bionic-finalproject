'use strict';

import router from 'router';
import menu from 'menu';

import users from './users';

let init = () => {
  let isUser = localStorage.getItem("user");
  if(isUser){
    setActiveUser(JSON.parse(isUser));
  }
  userMenu();
};

let getActiveUser = () => {
  return getUserData();
};

let setActiveUser = (user) => {
  let newUser = JSON.stringify(user);
  localStorage.setItem("user", newUser);
};

let removeUser = () => {
  localStorage.removeItem("user");
  init();
};

let getUserData = () => { 
  return JSON.parse(localStorage.getItem("user")); 
};

let findUser = (user) => {
  for(let i = 0; i < users.length; i++){
    if(user.login === users[i].name && user.pass === users[i].password){
      return users[i];
      break;
    }
  }
  return false;
};

let getStatus = () => {
  let userData = getUserData();
  if ( !!userData ){
    if ( userData && !!userData.name ) {
      if (userData.admin === true) {
        // return 'admin';
        return {admin: true}
      }
      // return 'user';
      return {user: true}
    }
  }
  // return 'guest';
  return {guest: true}
};











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
};

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
};

export default {
  getStatus,
  getActiveUser,
  setActiveUser,
  findUser,
  userMenu,
  init
};

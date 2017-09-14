'use strict';

import router from 'router';
import menu from 'menu';

import users from '../api/users.json';

let init = () => {
  let isUser = localStorage.getItem('user');
  if(isUser){
    setActiveUser(JSON.parse(isUser));
  }
};

let setActiveUser = (user) => {
  let newUser = JSON.stringify(user);
  localStorage.setItem('user', newUser);
};

let removeUser = () => {
  localStorage.removeItem('user');
  init();
};

let getUserData = () => { 
  return JSON.parse(localStorage.getItem('user'));
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
        return {admin: true};
      }
      return {user: true};
    }
  }
  return {guest: true};
};

export default {
  setActiveUser,
  getStatus,
  getUserData,
  findUser,
  removeUser,
  init
};

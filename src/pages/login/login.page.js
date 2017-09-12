'use strict';

import Page from '../page';
import user from 'user';
import router from 'router';
import userMenu from 'usermenu';
import menu from 'menu';

import loginPageContent from './login.page.html';

class LoginPage extends Page {
  constructor(url){
    super(url);
    this.content = loginPageContent;
  }
  whenPageRendered() {
    this.authorization();
  }

  authorization() {
    let authorizationForm = document.getElementById('authorization-form');

    let that = this;
    authorizationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let userData = {
        login: this.login.value,
        pass: this.password.value
      }
      that.findUser(userData);
      this.login.value = '';
      this.password.value = '';
    });

    this.hideErrorMessage(authorizationForm);
  }

  hideErrorMessage(authorizationForm) {
    let authorizationInputs = authorizationForm.querySelectorAll('.authorization-form__input');

    for(let i = 0; i < authorizationInputs.length; i++){
      authorizationInputs[i].addEventListener('focus', function(){
        let output = document.querySelector('.output');
        if(!!output){
          document.querySelector('.output').classList.remove('show');
        }
      });
    }
  }

  findUser(userData) {
    let newActiveUser = user.findUser(userData);
    let wraper = document.getElementById('login-page');
    if(newActiveUser) {
      user.setActiveUser(newActiveUser);
      menu.render();
      console.log(menu.render);
      userMenu.init();
      router.redirectToPage('/#');
    } else {
      document.querySelector('.output').classList.add('show');
    }
  }
}

let loginPage = new LoginPage('#/login');

export default loginPage;
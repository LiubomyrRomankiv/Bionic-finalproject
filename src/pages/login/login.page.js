'use strict';

import Page from '../page';
import loginPageContent from './login.page.html';
import user from '../../user';

class LoginPage extends Page {
  constructor(url){
    super(url);
    this.content = loginPageContent;
  }
  whenPageRendered() {
    this.authorization();
  }

  authorization(){
    let authorizationForm = document.getElementById('authorization-form');
    let authorizationInputs = authorizationForm.querySelectorAll('.authorization-form__input');

    authorizationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let userData = {
        login: this.login.value,
        pass: this.password.value
      }
      user.userAuthorization(userData, 'login-page');
      this.login.value = '';
      this.password.value = '';
    });

    for(let i = 0; i < authorizationInputs.length; i++){
      authorizationInputs[i].addEventListener('focus', function(){
        let output = document.querySelector('.output');
        if(!!output){
          document.querySelector('#login-page').removeChild(output);
        }
      });
    }
  }
}

let loginPage = new LoginPage('#/login');

export default loginPage;
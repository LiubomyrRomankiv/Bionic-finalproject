'use strict';

import menu from 'menu';
import test from 'test';
import user from 'user';

import Page from '../page';
import homePageContent from './home.page.html';

class HomePage extends Page {
  constructor(url){
    super(url);
    this.content = this.setContent();
    this.data = this.setData();
    this.userStatus = {
      guest: true,
      user: true,
      admin: true
    };
  }

  setContent() {
    let activeUser = user.getUserData();
    if(activeUser){
      return test.getTemplate();
    } else {
      return homePageContent;
    }
  }

  setData() {
    let activeUser = user.getUserData();
    if(activeUser){
      let questions = test.getData();
      let data = { questions, name: activeUser.name };
      return data;
    } else {
      return {};
    }
  }

  whenPageRendered() {
    this.goTest();
  }

  setTestContent(userName) {
    this.content = test.getTemplate();
    let questions = test.getData();
    this.data = { questions, name: userName };
  }

  setDefaultContent() {
    this.content = homePageContent;
    this.data = {};
  }

  goTest() {
    let userNameInput = document.querySelector('.newuser-nameinput');
    let link = document.querySelector('.test-link');

    if(link) {
      let that = this;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        let hash = e.target.hash;
        let userName = userNameInput.value;
        if (userName) {
          that.setTestContent(userName);
          this.render();
        }
      });
    }
    test.setName(this.data.name);
  }
}

let homePage = new HomePage('#/');

export default homePage;

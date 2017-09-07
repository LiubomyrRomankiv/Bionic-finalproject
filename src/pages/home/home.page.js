'use strict';

import router from 'router';
import menu from 'menu';
import test from 'test';
import helpers from '../../helpers';
import Page from '../page';
import homePageContent from './home.page.html';
// import shortid from 'shortid';

class HomePage extends Page {
  constructor(url){
    super(url);
    this.content = homePageContent;
  }
  whenPageRendered() {
    this.goTest();
  }
  goTest() {
    let userNameInput = document.querySelector('.newuser-nameinput');
    let link = document.querySelector('.test-link');

    if(link) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        let hash = e.target.hash;
        let userName = userNameInput.value;
        if (userName) {
          this.content = test.getTemplate();
          let questions = test.getData();
          this.data = { questions, name: userName };
          this.render();
        }
      });
    }
  }
}

let homePage = new HomePage('#/');

export default homePage;
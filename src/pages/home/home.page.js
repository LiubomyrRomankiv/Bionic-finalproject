'use strict';

import router from 'router';
import menu from 'menu';
import helpers from '../../helpers';
import Page from '../page';
import homePageContent from './home.page.html';
import testContent from 'test/test.html';

import questions from 'test/tests.json';

class HomePage extends Page {
  constructor(url){
    super(url);
    this.content = homePageContent;
    this.data = { title: 'This is Home Page' };
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
          this.content = testContent;
          this.data = { questions, name: userName };
          this.render();
          // router.renderPage(hash);
          // window.location.hash = hash;
          // menu.drawActiveMenuItems(hash);
        }
      });
    }
  }
}

let homePage = new HomePage('#/');

export default homePage;
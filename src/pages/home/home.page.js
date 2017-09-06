'use strict';

import Page from '../page';
import router from '../../router';
import homePageContent from './home.page.html';

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
    let userName = '';
    let link = document.querySelector('.test-link');

    link.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(this);
      let hash = this.getAttribute('href');
      if (userName) {
        router.renderPage(hash);
      }
    });
  }
}

let homePage = new HomePage('#/');

export default homePage;
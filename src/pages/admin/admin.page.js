'use strict';

import _ from 'lodash';

import Page from '../page';
import adminPageContent from './admin.page.html';

class AdminPage extends Page {
  constructor(url){
    super(url);
    this.content = adminPageContent;
    this.userStatus = {
      guest: false,
      user: false,
      admin: true
    };
  }
  whenPageRendered() {
    
  }
}

let adminPage = new AdminPage('#/admin');

export default adminPage;
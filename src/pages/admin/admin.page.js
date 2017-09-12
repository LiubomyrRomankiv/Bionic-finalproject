'use strict';

import _ from 'lodash';

import Page from '../page';
import adminPageContent from './admin.page.html';

class AdminPage extends Page {
  constructor(url){
    super(url);
    this.content = adminPageContent;
  }
  whenPageRendered() {
    
  }
}

let adminPage = new AdminPage('#/admin');

export default adminPage;
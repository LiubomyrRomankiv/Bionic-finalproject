'use strict';

import _ from 'lodash';
import dom from '../../dom';

import Page from '../page';
import adminPageContent from './admin.page.html';
import users from '../../user/users';

class AdminPage extends Page {
  constructor(url){
    super(url);
    this.content = adminPageContent;
  }
  whenPageRendered() {
    let pageContainer = document.getElementById('admin-page');
    
    let usersList = dom.createElement('ul', [{
      name: 'id',
      val: 'users-list'
    },
    {
      name: 'class',
      val: 'users-list'
    }]);

    let usersListItem = _.map(users, (user) => {
      let isAdmin = user.admin ? 'admin' : ''
      return `<li><p>${user.name} <span>${isAdmin}</span></p></li>`;
    });
    usersList.innerHTML = usersListItem.join(' ');
    pageContainer.appendChild(usersList);
  }
}

let adminPage = new AdminPage('#/admin');

export default adminPage;
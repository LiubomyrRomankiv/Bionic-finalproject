'use strict';

import Page from '../page';
import contactsPageContent from './contacts.page.html';

class ContactsPage extends Page {
  constructor(url){
    super(url);
    this.content = contactsPageContent;
  }
}

let contactsPage = new ContactsPage('#/contacts');

export default contactsPage;
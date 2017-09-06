'use strict';

import Page from '../page';
import testPageContent from './test.page.html';
import questions from './tests.json';

class TestPage extends Page {
  constructor(url){
    super(url);
    this.content = testPageContent;
    this.data = { questions };
  }
}

let testPage = new TestPage('#/test');

export default testPage;
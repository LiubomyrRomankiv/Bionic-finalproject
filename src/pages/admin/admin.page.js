'use strict';

import _ from 'lodash';
import handlebars from 'handlebars';

import tests from '../../components/test/tests.json';

import testForm from './templates/newquestionForm.template.html';
import textAnswer from './templates/checkAnswer.template.html';
import checkAnswer from './templates/textAnswer.template.html';

import Page from '../page';
import adminPageContent from './admin.page.html';

class AdminPage extends Page {
  constructor(url){
    super(url);
    this.content = adminPageContent;
    this.data = { tests };
    this.userStatus = {
      guest: false,
      user: false,
      admin: true
    };
  }

  whenPageRendered() {
    this.renderQuestionForm();
  }

  renderQuestionForm() {
    let formContainer = document.querySelector('#question-form_block');
    let html = handlebars.compile(testForm)();
    formContainer.innerHTML = html;
  }

  renderAnswers(type) {
    let formContainer = document.querySelector('.answers-block');
    let html = handlebars.compile(checkAnswer)();
    if( type === 'text' ){
      html = handlebars.compile(textAnswer)();
    }
    formContainer.innerHTML = html;
  }
}

let adminPage = new AdminPage('#/admin');

export default adminPage;
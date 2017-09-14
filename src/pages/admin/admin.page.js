'use strict';

import _ from 'lodash';
import handlebars from 'handlebars';

import actions from 'actions';
import dom from 'dom';

import testForm from './templates/newquestionForm.template.html';
import radioAnswer from './templates/radioAnswer.template.html';
import checkAnswer from './templates/checkAnswer.template.html';
import textAnswer from './templates/textAnswer.template.html';

import Page from '../page';
import adminPageContent from './admin.page.html';

class AdminPage extends Page {
  constructor(url){
    super(url);
    this.content = adminPageContent;
    this.data = { tests: actions.getTestQuestions() };
    this.userStatus = {
      guest: false,
      user: false,
      admin: true
    };
  }

  whenPageRendered() {
    this.addNewQuestion()
  }

  renderQuestionForm() {
    let formContainer = document.querySelector('#question-form_block');
    let html = handlebars.compile(testForm)();
    formContainer.innerHTML = html;
  }

  loadAnswers() {
    dom.findElement('.question-type', () => {
      let questionTypeInputs = document.querySelectorAll('.question-type');
      _.each(questionTypeInputs, (item) => {
        item.addEventListener('change', (e) => {
          this.renderAnswers(e.target.value);
        });
      });
    });
  }

  addNewQuestion() {
    dom.findElement('#newquestion-btn', () => {
      let questionTypeInputs = document.querySelector('#newquestion-btn');
      questionTypeInputs.addEventListener('click', (e) => {
        this.renderQuestionForm();
        this.renderAnswers('radio');
        this.loadAnswers();
      });
    });
  }

  renderAnswers(type) {
    let answerType = type;
    dom.findElement('.answers-block', (answerType) => {
      let formContainer = document.querySelector('.answers-block');
      let html = '';
      if( type === 'radio' ){
        html = handlebars.compile(radioAnswer)();
      }
      if( type === 'checkbox' ){
        html = handlebars.compile(checkAnswer)();
      }
      if( type === 'text' ){
        html = handlebars.compile(textAnswer)();
      }
      formContainer.innerHTML = html;
    });
  }
}

let adminPage = new AdminPage('#/admin');

export default adminPage;
'use strict';

import _ from 'lodash';
import handlebars from 'handlebars';
import shortid from 'shortid';

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
        this.questionFormSubmit();
      });
    });
  }

  questionFormSubmit(id) {
    let newQuestion = {};
    let questionForm = document.querySelector('.question-form');
    let that = this;
    questionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let question = questionForm.querySelector('.question-text').value;
      let type = questionForm.querySelector('.question-type:checked').value;
      
      newQuestion.question = question;
      newQuestion.type = type;

      if (type === 'text') {
        let correct = questionForm.querySelector('.answer-text').value;
        newQuestion.correct = correct;
        if(newQuestion.answers){
          delete newQuestion.answers;
        }
      } else {
        if (that.checkedAnswersValidation(questionForm)) {
          newQuestion.answers = that.checkedAnswersValidation(questionForm);
          if (newQuestion.correct) {
            delete newQuestion.correct;
          }
        } else {
          return false;
        }
      }

      if (id) {
        newQuestion.id = id;
        // actions.updateQuestion(newQuestion);
        console.log('update');
      } else {
        newQuestion.id = shortid.generate();
        // actions.addNewQuestion(newQuestion);
      }
    });
  }

  updateQuestion(id) {
    let questionsList = actions.getTestQuestions();
    if (questionsList) {
      let modifiedQuestion = _.find(questionsList, { id });
      console.log(modifiedQuestion);
    }
  }

  checkedAnswersValidation(form) {
    let output = form.querySelector('.output');
    let answersText = form.querySelectorAll('.answer');
    let answersCorrect = form.querySelectorAll('.iscorrect');
    let answersCorrectChecked = form.querySelector('.iscorrect:checked');
    if (answersCorrect && !answersCorrectChecked) {
      output.classList.add('show');
      output.innerHTML = 'At least one answer must be correct!';
      return false;
    }
    return _.map(answersText, (item, i) => {
      return {text: item.value, correct: answersCorrect[i].checked};
    });
  }

  renderAnswers(type) {
    let answerType = type;
    dom.findElement('.answers-block', (answerType) => {
      let formContainer = document.querySelector('.answers-block');
      let html = '';
      if ( type === 'radio' ){
        html = handlebars.compile(radioAnswer)();
      }
      if ( type === 'checkbox' ){
        html = handlebars.compile(checkAnswer)();
      }
      if ( type === 'text' ){
        html = handlebars.compile(textAnswer)();
      }
      formContainer.innerHTML = html;
    });
  }
}

let adminPage = new AdminPage('#/admin');

export default adminPage;

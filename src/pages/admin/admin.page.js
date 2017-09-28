'use strict';

import _ from 'lodash';
import handlebars from 'handlebars';
import shortid from 'shortid';
import moment from 'moment';

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
    this.data = { tests: actions.getTestQuestions, statistics: actions.getStatistics };
    this.userStatus = {
      guest: false,
      user: false,
      admin: true
    };
  }

  whenPageRendered() {
    this.addNewQuestion();
    this.updateQuestionHandle();
    this.deleteQuestionHandle();
    this.showHideStatistics();
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

  showHideStatistics() {
    let informationBlock = document.querySelector('.information');
    let showStatisticsBtn = document.querySelector('.show-statistics');
    let showQuestionsBtn = document.querySelector('.show-questions');

    showStatisticsBtn.addEventListener('click', () => {
      informationBlock.classList.add('show-statistics');
    });

    showQuestionsBtn.addEventListener('click', () => {
      informationBlock.classList.remove('show-statistics');
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
        this.hideForm();
      });
    });
  }

  questionFormSubmit(id) {
    let questionForm = document.querySelector('.question-form');
    questionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (id) {
        this.formSubmit(questionForm, id);
      } else {
        this.formSubmit(questionForm);
      }
      document.querySelector('.question-form_block').innerHTML = '';
      this.data = { tests: actions.getTestQuestions() };
      this.render();
    });
  }

  hideForm() {
    let formContainer = document.querySelector('.question-form__container .close-btn');
    formContainer.addEventListener('click', () => {
      document.querySelector('.question-form_block').innerHTML = '';
    });
  }

  formSubmit(form, id) {
    let newQuestion = {};
    let question = form.querySelector('.question-text').value;
    let type = form.querySelector('.question-type:checked').value;
    
    newQuestion.question = question;
    newQuestion.type = type;

    if (type === 'text') {
      let correct = form.querySelector('.answer-text').value;
      newQuestion.correct = correct;
      if(newQuestion.answers){
        delete newQuestion.answers;
      }
    } else {
      if (this.checkedAnswersValidation(form)) {
        newQuestion.answers = this.checkedAnswersValidation(form);
        if (newQuestion.correct) {
          delete newQuestion.correct;
        }
      } else {
        return false;
      }
    }

    if (id) {
      newQuestion.id = id;
      actions.updateQuestion(newQuestion);
    } else {
      newQuestion.id = shortid.generate();
      actions.addNewQuestion(newQuestion);
    }
  }

  setQuestionData(id) {
    this.renderQuestionForm();
    let questionData =  _.find(actions.getTestQuestions(), { id });
    document.getElementById(questionData.type).checked = true;
    this.renderAnswers(questionData.type);
    let questionText = document.querySelector('#question-form .question-text');
    questionText.value = questionData.question;
    let answers = document.querySelectorAll('#question-form .answer');
    let correct = document.querySelectorAll('#question-form .iscorrect');
    _.map(answers, (answer, i) => {
      if (questionData) {
        if (questionData.type === 'text') {
          answer.value = questionData.correct;
        } else {
          answer.value = questionData.answers[i].text;
          correct[i].checked = questionData.answers[i].correct;
        }
      }
    });
  }

  updateQuestionHandle() {
    let updateBtns = document.querySelectorAll('.btn-update');
    _.each(updateBtns, (item) => {
      item.addEventListener('click', (e) => {
        let id = e.target.dataset.question;
        this.setQuestionData(id);
        this.questionFormSubmit(id);
        this.hideForm();
      });
    });
  }

  deleteQuestionHandle() {
    let deleteBtns = document.querySelectorAll('.btn-delete');
    _.each(deleteBtns, (item) => {
      item.addEventListener('click', (e) => {
        let id = e.target.dataset.question;
        actions.removeQuestion(id);
        this.data = { tests: actions.getTestQuestions() };
        this.render();
      });
    });
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

handlebars.registerHelper('inc', (i) => {
  return ++i;
});

handlebars.registerHelper('momentdate', (date) => {
  return moment(date).fromNow();
});

let adminPage = new AdminPage('#/admin');

export default adminPage;

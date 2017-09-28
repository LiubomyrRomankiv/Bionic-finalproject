'use strict';

import _ from 'lodash';

import dom from 'dom';
import actions from 'actions';

import testTemplate from './test.html';

let counter = 0;
let name = '';
let runned = false;

let getTemplate = () => {
  submitHandler();
  return testTemplate;
}

let getData = () => {
  return actions.getTestQuestions();
}

let setTestStatistics = () => {
  runned = true;
  let data = {
    name: name,
    correctAnswers: counter,
    allAnswers: document.querySelectorAll('.question').length,
    date: new Date()
  };

  actions.setStatistics(data);
}

let finishTest = () => {
  let data = getData();
  let questionBlocks = document.querySelectorAll('.question-block');

  _.each(questionBlocks, (item) => {
    let _id = item.getAttribute('id');
    let text = item.classList.contains('text');
    if( text ) {
      let textQuestion = document.querySelector(`#${_id} input[type="text"]`);
      showTextItems(data, textQuestion);
    } else {
      showSelectedItems(data, item);
    }
  });

  showResults();
  if( !runned ) {
    setTestStatistics();
    runned = false;
  }
  
  counter = 0;
}

let init = () => {
  let isUser = localStorage.getItem('user');
  if(isUser){
    setActiveUser(JSON.parse(isUser));
  }
};

let setActiveUser = (user) => {
  let newUser = JSON.stringify(user);
  localStorage.setItem('user', newUser);
};

let showSelectedItems = (data, item) => {
  let activeQuestion = _.find(data, {id: item.getAttribute('id')});
  let allAnswerItems = document.querySelectorAll(`#${activeQuestion.id} input`);
  let correct = true;

  _.each(allAnswerItems, (item) => {   
    let currentAnswer = _.find(activeQuestion.answers, {text: item.value});
    if( currentAnswer.correct ) {
      item.parentNode.classList.add('good');
    } 
    if( item.checked && !currentAnswer.correct ) {
      item.parentNode.classList.add('bad');
      correct = false;
    }
    if( !item.checked && currentAnswer.correct ) {
      correct = false;
    }
  });

  if( correct ) {
    counter++;
  }
}

let showTextItems = (data, item) => {
  let activeQuestion = _.find(data, {id: item.getAttribute('name')});
  if(item.value === activeQuestion.correct){
    item.classList.add('good');
    counter++;
  } else {
    item.classList.add('bad');
  }
}

let showResults = () => {
  let output = document.querySelector('#test .output');
  let questionsLength = document.querySelectorAll('.question').length;
  output.innerHTML = `You have <b>${counter}</b> correct answers from <b>${questionsLength}</b>`;
  output.classList.add('show');
}

let setName = (newName) => {
  name = newName;
}

let allQuestionsAnswered = () => {
  let error = false;
  let questions = document.querySelectorAll('.question-block');
  _.each(questions, (question) => {
    let id = question.getAttribute('id');
    let checkedAnswers = question.querySelectorAll('.check-ans');
    let textAnswer = question.querySelector('.text-input');
    if(checkedAnswers.length > 0) {
      let checked = question.querySelectorAll('.check-ans:checked');
      if(checked.length === 0) {
        document.getElementById(id).classList.add('error');
        error = true;
      }
    }
    if(textAnswer && textAnswer.value === '') {
      document.getElementById(id).classList.add('error');
      error = true;
    }
  });

  return error;
}

let hideError = () => {
  let questions = document.querySelectorAll('.question-block');
  _.each(questions, (question) => {
    let id = question.getAttribute('id');
    question.addEventListener('click', () => {
      document.getElementById(id).classList.remove('error');
    });
  });
}

let submitHandler = () => {
  dom.findElement('.finishtest-btn', () => {
    let finishBtn = document.querySelector('.finishtest-btn');
    finishBtn.addEventListener('click', (e) => {
      let error = allQuestionsAnswered();
      if (!error) {
        finishTest();
        e.target.disabled = true;
      } else {
        hideError();
      }
    });
  });
}


export default {
  getTemplate,
  getData,
  setName
};
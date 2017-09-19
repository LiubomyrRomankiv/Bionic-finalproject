'use strict';

import _ from 'lodash';

import dom from 'dom';
import actions from 'actions';

import testTemplate from './test.html';

let counter = 0;

let getTemplate = () => {
  return testTemplate;
}

let getData = () => {
  return actions.getTestQuestions();
}

let finishTest = () => {
  let data = getData();
  let checkQuestions = document.querySelectorAll('#test input:checked');
  let textQuestions = document.querySelectorAll('#test input[type="text"]');
  
  _.each(checkQuestions, (item) => {
    showSelectedItems(data, item);
  });

  _.each(textQuestions, (item) => {
    showTextItems(data, item);
  });

  showResults();
}

let showSelectedItems = (data, item) => {
  let activeQuestion = _.find(data, {id: item.getAttribute('name')});
  let answerStatus = _.find(activeQuestion.answers, {text: item.value});
  let allItemsSelector =  `#test #${activeQuestion.id} + ul input`;
  let hasFalse = false;
  
  if(answerStatus.correct){
    item.parentNode.classList.add('good');
    if( activeQuestion.type === 'radio' ){
      counter++;
    } else {
      let checks = document.querySelectorAll(`${allItemsSelector}:checked`);
      _.each(checks, (item) => {
        let ans = _.find(activeQuestion.answers, {text: item.value});
        if( !ans.correct ){
          hasFalse = true;
        }
      });

      if( !hasFalse ){
        counter++;
      }
    }
  } else {
    let correctAnswer = _.find(activeQuestion.answers, {correct: true});
    let allAnswerItems = document.querySelectorAll(allItemsSelector);
    let correctItem = _.find(allAnswerItems, {value: correctAnswer.text});
    correctItem.parentNode.classList.add('good');
    item.parentNode.classList.add('bad');
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

dom.findElement('.finishtest-btn', () => {
  let finishBtn = document.querySelector('.finishtest-btn');
  finishBtn.addEventListener('click', () => {
    finishTest();
  });
});

export default {
  getTemplate,
  getData
};
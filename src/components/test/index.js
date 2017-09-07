'use strict';

import _ from 'lodash';
import testTemplate from './test.html';
import testData from './tests.json';

let counter = 0;

let getTemplate = () => {
  return testTemplate;
}

let getData = () => {
  return testData;
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
    item.parentNode.style.border = '1px solid green';
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
    correctItem.parentNode.style.border = '1px solid green';
    item.parentNode.style.border = '1px solid red';
  }
}

let showTextItems = (data, item) => {
  let activeQuestion = _.find(data, {id: item.getAttribute('name')});
  if(item.value === activeQuestion.correct){
    item.style.border = '1px solid green';
    counter++;
  } else {
    item.style.border = '1px solid red';
  }
}

let showResults = () => {
  let output = document.querySelector('.output');
  let questionsLength = document.querySelectorAll('.question').length;
  output.innerHTML = `You have ${counter} correct answers from ${questionsLength}`;
}

let findElement = (selector, callback) => {
  let element = document.querySelector(selector);
  if(!!element){
    callback();
  } else {
    setTimeout(() => {
      findElement(selector, callback);
    },200);
  }
}

findElement('.finishtest-btn', () => {
  let finishBtn = document.querySelector('.finishtest-btn');
  finishBtn.addEventListener('click', () => {
    finishTest();
  });
});

export default {
  getTemplate,
  getData
};
import test from '../api/tests.json';

// Test actions

let loadTestQuestions = () => {
  let questionsLoaded = getTestQuestions();
  if(!questionsLoaded) {
    setTestQuestions();
  }
};

let setTestQuestions = (questions = test) => {
  localStorage.setItem( 'test', JSON.stringify(questions) );
};

let getTestQuestions = () => {
  return JSON.parse( localStorage.getItem('test') );
};

let clearTestQuestions = () => {
  localStorage.removeItem('test');
};

let addNewQuestion = (question) => {
  let questions = getTestQuestions();
  questions = [...questions, question];
  setTestQuestions(questions);
};

let removeQuestion = (id) => {
  let questions = getTestQuestions();
  let questionToRemove = _.find(questions, { id });
  _.remove(questions, questionToRemove);
  setTestQuestions(questions);
};

let updateQuestion = (question) => {
  let questions = getTestQuestions();
  let index = _.findIndex(questions, { id: question.id });
  questions.splice(index, 1, question);
  setTestQuestions(questions);
};

// Statistics actions

let getStatistics = () => {
  let statistics = localStorage.getItem('statistics');
  return JSON.parse(statistics);
};

let setStatistics = (data) => {
  let statisticsArr = [];
  let statistics = getStatistics();
  
  if(statistics) {
    statisticsArr = [...statistics, data];
  } else {
    statisticsArr = [data];
  }

  statisticsArr = JSON.stringify(statisticsArr);
  localStorage.setItem('statistics', statisticsArr);
};


export default {
  loadTestQuestions,
  getTestQuestions,
  clearTestQuestions,
  addNewQuestion,
  removeQuestion,
  updateQuestion,
  getStatistics,
  setStatistics
}
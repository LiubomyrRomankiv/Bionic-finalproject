import test from '../api/tests.json';

let loadTestQuestions = () => {
  let questionsLoaded = getTestQuestions();
  if(!questionsLoaded) {
    setTestQuestions();
  }
}

let setTestQuestions = (questions = test) => {
  localStorage.setItem( 'test', JSON.stringify(questions) );
}

let getTestQuestions = () => {
  return JSON.parse( localStorage.getItem('test') );
}

let clearTestQuestions = () => {
  localStorage.removeItem('test');
}

let addNewQuestion = (question) => {
  let questions = getTestQuestions();
  questions = [...questions, question];
  setTestQuestions(questions);
}

let removeQuestion = (id) => {
  let questions = getTestQuestions();
  let questionToRemove = _.find(questions, { id });
  _.remove(questions, questionToRemove);
  setTestQuestions(questions);
}

let updateQuestion = (question) => {
  let questions = getTestQuestions();
  let index = _.findIndex(questions, { id: question.id });
  questions.splice(index, 1, question);
  setTestQuestions(questions);
}

export default {
  loadTestQuestions,
  getTestQuestions,
  clearTestQuestions,
  addNewQuestion,
  removeQuestion,
  updateQuestion
}
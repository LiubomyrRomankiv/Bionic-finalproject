'use strict';

import './main.scss';

import router from 'router';
import user from './user';
import menu from 'menu';
import userMenu from 'usermenu';
import actions from 'actions';

router.init();
user.init();
menu.init();
userMenu.init();
actions.loadTestQuestions();
// actions.clearTestQuestions();
// actions.removeQuestion('BklCW6RYZ');
// actions.updateQuestion({
//     "id": "HyJxf6CYZ",
//     "question": "updated question 2",
//     "type": "checkbox",
//     "answers": [
//       {
//         "text": "answer 1",
//         "correct": false
//       },
//       {
//         "text": "answer 2",
//         "correct": false
//       },
//       {
//         "text": "answer 3",
//         "correct": true
//       },
//       {
//         "text": "answer 4",
//         "correct": false
//       }
//     ]
//   });
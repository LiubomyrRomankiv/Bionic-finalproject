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
'use strict';

import './main.scss';

import router from './router';
import user from './user';
import Menu from './menu';

router.init();
user.init();
let menu = new Menu();
menu.render();
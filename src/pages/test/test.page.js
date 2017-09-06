'use strict';

import Page from '../page';
import testPageContent from './test.page.html';

class TestPage extends Page {
	constructor(url){
		super(url);
		this.content = testPageContent;
	}
}

let testPage = new TestPage('#/test');

export default testPage;
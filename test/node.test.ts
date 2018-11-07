import { expect } from 'chai';

import { count as iconCount } from './icon-count.json';

const mdIconChars = require('../');

describe('Node module', () => {
	it('should load valid character list in JSON', () => {
		expect(mdIconChars).to.have.length(iconCount);
		expect(mdIconChars[0]).to.have.all.keys(['id', 'unicode']);
	});
});

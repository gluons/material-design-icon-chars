import { expect } from 'chai';

const iconCount = require('./icon-count.json').count;
const mdIconChars = require('../dist');

describe('Node module', () => {
	it('should load valid character list in JSON', () => {
		expect(mdIconChars).to.have.length(iconCount);
		expect(mdIconChars[0]).to.have.all.keys(['id', 'unicode']);
	});
});

'use strict';

const expect = require('chai').expect;

const mdIconChars = require('../');

const iconCount = require('./icon-count.json').count;

describe('Node module', function () {
	it('should load valid character list in JSON', function () {
		expect(mdIconChars).to.have.length(iconCount);
		expect(mdIconChars[0]).to.have.all.keys([
			'id',
			'unicode'
		]);
	});
});

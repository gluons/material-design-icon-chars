var expect = require('chai').expect;

var mdIconChars = require('../');

var iconCount = 932;

describe('Node module', function () {
	it('should load valid character list in JSON', function () {
		expect(mdIconChars.icons).to.have.length(iconCount);
		expect(mdIconChars.icons[0]).to.have.all.keys([
			'id',
			'unicode'
		]);
	});
});

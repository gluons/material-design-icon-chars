import { expect } from 'chai';
import { accessSync, constants as fsConstants, readFileSync } from 'fs';

import CSON from 'cson';
import yaml from 'js-yaml';
import toml from 'toml';
import xml2js from 'xml2js';

const iconCount = require('./icon-count.json').count;
const { F_OK, R_OK } = fsConstants;

describe('Character list files', function () {
	this.timeout(5000);
	this.slow(1000);

	it('should create valid CSON character list file', () => {
		expect(() => {
			accessSync('character-list/character-list.cson', F_OK | R_OK);
		}).to.not.throw(Error);

		const charListCSON = CSON.parse(
			readFileSync('character-list/character-list.cson', 'utf8')
		);
		expect(charListCSON).to.not.be.instanceof(Error);
		expect(charListCSON.icons).to.have.length(iconCount);
		expect(charListCSON.icons[0]).to.have.all.keys(['id', 'unicode']);
	});
	it('should create valid JSON character list file', () => {
		expect(() => {
			accessSync('character-list/character-list.json', F_OK | R_OK);
		}).to.not.throw(Error);
		const charListJSON = require('../character-list/character-list.json');
		expect(charListJSON.icons).to.have.length(iconCount);
		expect(charListJSON.icons[0]).to.have.all.keys(['id', 'unicode']);
	});
	it('should create valid TOML character list file', () => {
		expect(() => {
			accessSync('character-list/character-list.toml', F_OK | R_OK);
		}).to.not.throw(Error);

		expect(() => {
			const charListTOML = toml.parse(
				readFileSync('character-list/character-list.toml', 'utf8')
			);
			expect(charListTOML.icons).to.have.length(iconCount);
			expect(charListTOML.icons[0]).to.have.all.keys(['id', 'unicode']);
		}).to.not.throw(Error);
	});
	it('should create valid XML character list file', done => {
		expect(() => {
			accessSync('character-list/character-list.xml', F_OK | R_OK);
		}).to.not.throw(Error);

		const charListXML = readFileSync(
			'character-list/character-list.xml',
			'utf8'
		);
		xml2js.parseString(charListXML, (_, result) => {
			expect(result.icons.icon).to.have.length(iconCount);
			expect(result.icons.icon[0].$).to.have.all.keys('id');
			done();
		});
	});
	it('should create valid YAML character list file', () => {
		expect(() => {
			accessSync('character-list/character-list.yaml', F_OK | R_OK);
		}).to.not.throw(Error);

		expect(() => {
			const charListYAML = yaml.safeLoad(
				readFileSync('character-list/character-list.yaml', 'utf8')
			);
			expect(charListYAML.icons).to.have.length(iconCount);
			expect(charListYAML.icons[0]).to.have.all.keys(['id', 'unicode']);
		}).to.not.throw(Error);
	});
});

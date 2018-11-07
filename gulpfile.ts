import { dest, parallel } from 'gulp';
import json2cson from 'gulp-json2cson';
import plumber from 'gulp-plumber';

import del from 'del';
import yaml from 'js-yaml';
import tomlify from 'tomlify-j0.4';
import xmlBuilder from 'xmlbuilder';

import { createStream, getSource } from './lib/utils';

export const clean = function clean() {
	return del('character-list/*');
};

export const buildJSON = async function buildJSON() {
	const iconSource = await getSource();

	return createStream(
		'character-list.json',
		JSON.stringify(iconSource, null, '\t')
	)
		.pipe(plumber())
		.pipe(dest('character-list'));
};
buildJSON.displayName = 'build:json';

export const buildCSON = async function buildCSON() {
	const iconSource = await getSource();

	return createStream('character-list.cson', JSON.stringify(iconSource))
		.pipe(plumber())
		.pipe(json2cson())
		.pipe(dest('character-list'));
};
buildCSON.displayName = 'build:cson';

export const buildXML = async function buildXML() {
	const iconSource = await getSource();
	const { icons } = iconSource;
	const xmlObj = {
		icons: {
			icon: []
		}
	};

	for (const icon of icons) {
		xmlObj.icons.icon.push({
			'@id': icon.id,
			'#text': icon.unicode
		});
	}

	const xmlStr = xmlBuilder
		.create(xmlObj, {
			encoding: 'UTF-8'
		})
		.end({
			pretty: true,
			indent: '\t'
		});

	return createStream('character-list.xml', xmlStr)
		.pipe(plumber())
		.pipe(dest('character-list'));
};
buildXML.displayName = 'build:xml';

export const buildYAML = async function buildYAML() {
	const iconSource = await getSource();

	return createStream(
		'character-list.yaml',
		`---\n${yaml.safeDump(iconSource)}`
	)
		.pipe(plumber())
		.pipe(dest('character-list'));
};
buildYAML.displayName = 'build:yaml';

export const buildTOML = async function buildTOML() {
	const iconSource = await getSource();

	return createStream('character-list.toml', tomlify.toToml(iconSource))
		.pipe(plumber())
		.pipe(dest('character-list'));
};
buildTOML.displayName = 'build:toml';

export const build = parallel(
	buildJSON,
	buildCSON,
	buildXML,
	buildYAML,
	buildTOML
);
build.displayName = 'build';

export default build;

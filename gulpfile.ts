import { dest, parallel, series } from 'gulp';
import json2cson from 'gulp-json2cson';
import plumber from 'gulp-plumber';

import TOML from '@iarna/toml';
import del from 'del';
import yaml from 'js-yaml';
import xmlBuilder from 'xmlbuilder';

import { createStream, getSource } from './lib/utils';
import { ExtendibleIconSource } from './src/types/IconSource';

export function cleanNode() {
	return del('dist/*');
}

export function cleanList() {
	return del('character-list/*');
}

export async function buildJSON() {
	const iconSource = await getSource();

	return createStream(
		'character-list.json',
		JSON.stringify(iconSource, null, '\t')
	)
		.pipe(plumber())
		.pipe(dest('character-list'));
}

export async function buildCSON() {
	const iconSource = await getSource();

	return createStream('character-list.cson', JSON.stringify(iconSource))
		.pipe(plumber())
		.pipe(json2cson())
		.pipe(dest('character-list'));
}

export async function buildXML() {
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
}

export async function buildYAML() {
	const iconSource = await getSource();

	return createStream(
		'character-list.yaml',
		`---\n${yaml.safeDump(iconSource)}`
	)
		.pipe(plumber())
		.pipe(dest('character-list'));
}

export async function buildTOML() {
	const iconSource: ExtendibleIconSource = await getSource();

	return createStream('character-list.toml', TOML.stringify(iconSource))
		.pipe(plumber())
		.pipe(dest('character-list'));
}

export const build = series(
	cleanList,
	parallel(buildJSON, buildCSON, buildXML, buildYAML, buildTOML)
);

export default build;

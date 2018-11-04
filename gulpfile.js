const gulp = require('gulp-help')(require('gulp'));

const plumber = require('gulp-plumber');
const json2cson = require('gulp-json2cson');

const del = require('del');
const tomlify = require('tomlify-j0.4');
const xmlBuilder = require('xmlbuilder');
const yaml = require('js-yaml');

const utils = require('./lib/utils');

gulp.task('clean', 'Clean all built file.', function () {
	return del(['character-list/*']);
});

gulp.task('build:json', 'Build JSON character list file.', ['clean'], function () {
	return utils.getSource().then(function (icons) {
		let fileStream = utils.createStream('character-list.json', JSON.stringify(icons, null, '\t'));
		fileStream
			.pipe(plumber())
			.pipe(gulp.dest('character-list'));
		return fileStream;
	});
});

gulp.task('build:cson', 'Build CSON character list file.', ['clean'], function () {
	return utils.getSource().then(function (icons) {
		let fileStream = utils.createStream('character-list.json', JSON.stringify(icons, null, '\t'));
		fileStream
			.pipe(plumber())
			.pipe(json2cson())
			.pipe(gulp.dest('character-list'));
		return fileStream;
	});
});

gulp.task('build:xml', 'Build XML character list file.', ['clean'], function () {
	return utils.getSource().then(function (icons) {
		icons = icons.icons;
		let xmlObj = {
			icons: {
				icon: []
			}
		};
		for (let icon of icons) {
			xmlObj.icons.icon.push({
				'@id': icon.id,
				'#text': icon.unicode
			});
		}
		let xmlStr = xmlBuilder.create(xmlObj, {
			encoding: 'UTF-8'
		}).end({
			pretty: true,
			indent: '\t'
		});

		let fileStream = utils.createStream('character-list.xml', xmlStr);
		fileStream
			.pipe(plumber())
			.pipe(gulp.dest('character-list'));
		return fileStream;
	});
});

gulp.task('build:yaml', 'Build YAML character list file.', ['clean'], function () {
	return utils.getSource().then(function (icons) {
		let fileStream = utils.createStream('character-list.yaml', '---\n' + yaml.safeDump(icons));
		fileStream
			.pipe(plumber())
			.pipe(gulp.dest('character-list'));
		return fileStream;
	});
});

gulp.task('build:toml', 'Build TOML character list file.', ['clean'], function () {
	return utils.getSource().then(function (icons) {
		let fileStream = utils.createStream('character-list.toml', tomlify.toToml(icons));
		fileStream
			.pipe(plumber())
			.pipe(gulp.dest('character-list'));
		return fileStream;
	});
});

gulp.task('build', 'Build all file format.', ['build:json', 'build:cson', 'build:xml', 'build:yaml', 'build:toml']);

gulp.task('default', 'Default task. Run "build" task.', ['build']);

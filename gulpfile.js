var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');

var plumber = require('gulp-plumber');
var json2cson = require('gulp-json2cson');

var del = require('del');
var Q = require('q');
var readline = require('linebyline');
var tomlify = require('tomlify-j0.4');
var xmlBuilder = require('xmlbuilder');
var yaml = require('js-yaml');

/*
 * Functions
 */

var createStream = function (filename, content) {
	var src = require('stream').Readable({
		objectMode: true
	});
	src._read = function () {
		this.push(new gutil.File({
			cwd: '',
			base: '',
			path: filename,
			contents: new Buffer(content)
		}));
		this.push(null);
	};
	return src.pipe(plumber());
};

var convertSrc = function () {
	return Q.Promise(function (resolve) {
		var fs = require('fs');
		var rl = readline('node_modules/material-design-icons/iconfont/codepoints');
		var iconCodeData = {
			icons: []
		};
		rl.on('line', function (line) {
			var nameCode = line.split(' ');
			var name = nameCode[0];
			var code = nameCode[1];
			iconCodeData.icons.push({
				name: name,
				code: code
			});
		});
		rl.on('end', function () {
			fs.writeFile('material-design/icons.json', JSON.stringify(iconCodeData, null, '\t'), resolve);
		});
	});
};

var loadIcon = function () {
	return Q.Promise(function (resolve) {
		var icons = require('./material-design/icons.json').icons;
		var charList = {
			icons: []
		};
		for (var icon of icons) {
			var newIcon = {
				id: icon.name,
				unicode: icon.code
			};
			charList.icons.push(newIcon);
		}
		resolve(charList);
	});
};

/*
 * Tasks
 */

gulp.task('make:json', 'Build JSON character list file.', ['clean'], function () {
	return [
		convertSrc,
		loadIcon,
		function (icons) {
			return Q.Promise(function (resolve) {
				var fileStream = createStream('character-list.json', JSON.stringify(icons, null, '\t'));
				fileStream.pipe(gulp.dest('character-list'));
				fileStream.on('end', function () {
					resolve();
				});
			});
		}
	].reduce(Q.when, Q());
});

gulp.task('make:cson', 'Build CSON character list file.', ['clean'], function () {
	return [
		convertSrc,
		loadIcon,
		function (icons) {
			return Q.Promise(function (resolve) {
				var fileStream = createStream('character-list.json', JSON.stringify(icons, null, '\t'));
				fileStream.pipe(json2cson()).pipe(gulp.dest('character-list'));
				fileStream.on('end', function () {
					resolve();
				});
			});
		}
	].reduce(Q.when, Q());
});

gulp.task('make:xml', 'Build XML character list file.', ['clean'], function () {
	return [
		convertSrc,
		loadIcon,
		function (icons) {
			icons = icons.icons;
			return Q.Promise(function (resolve) {
				var xmlObj = {
					icons: {
						icon: []
					}
				};
				for (var icon of icons) {
					xmlObj.icons.icon.push({
						'@id': icon.id,
						'#text': icon.unicode
					});
				}
				var xmlStr = xmlBuilder.create(xmlObj, {
					encoding: 'UTF-8'
				}).end({
					pretty: true,
					indent: '\t'
				});

				var fileStream = createStream('character-list.xml', xmlStr);
				fileStream.pipe(gulp.dest('character-list'));
				fileStream.on('end', function () {
					resolve();
				});
			});
		}
	].reduce(Q.when, Q());
});

gulp.task('make:yaml', 'Build YAML character list file.', ['clean'], function () {
	return [
		convertSrc,
		loadIcon,
		function (icons) {
			return Q.Promise(function (resolve) {
				var fileStream = createStream('character-list.yaml', '---\n' + yaml.safeDump(icons));
				fileStream.pipe(gulp.dest('character-list'));
				fileStream.on('end', function () {
					resolve();
				});
			});
		}
	].reduce(Q.when, Q());
});

gulp.task('make:toml', 'Build TOML character list file.', ['clean'], function () {
	return [
		convertSrc,
		loadIcon,
		function (icons) {
			return Q.Promise(function (resolve) {
				var fileStream = createStream('character-list.toml', tomlify(icons, null, 2));
				fileStream.pipe(gulp.dest('character-list'));
				fileStream.on('end', function () {
					resolve();
				});
			});
		}
	].reduce(Q.when, Q());
});

gulp.task('make', 'Build all file format.', ['make:json', 'make:cson', 'make:xml', 'make:yaml', 'make:toml']);

gulp.task('clean', 'Clean all built file & JSON source file.', function () {
	return del(['material-design/icons.json', 'character-list/*']);
});

gulp.task('default', 'Default task. Run "make" task.', ['make']);

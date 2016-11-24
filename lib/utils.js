'use strict';

const gutil = require('gulp-util');
const path = require('path');
const readline = require('linebyline');
const stream = require('stream');

module.exports = {
	getSource(asArray = false) {
		return new Promise((resolve) => {
			let rawSource = {
				icons: []
			};
			let rl = readline(path.join(__dirname, '../material-design-icons/iconfont/codepoints'));
			rl.on('line', (line) => {
				let nameCode = line.split(' ');
				let name = nameCode[0];
				let code = nameCode[1];
				rawSource.icons.push({
					id: name,
					unicode: code
				});
			});
			rl.on('end', () => {
				resolve(asArray ? rawSource.icons : rawSource);
			});
		});
	},
	createStream(filename, content) {
		let src = stream.Readable({
			objectMode: true
		});
		src._read = function () {
			this.push(new gutil.File({
				cwd: '',
				base: '',
				path: filename,
				contents: Buffer.from(content)
			}));
			this.push(null);
		};
		return src;
	}
};

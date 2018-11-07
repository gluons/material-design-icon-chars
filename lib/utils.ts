import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Readable } from 'stream';
import Vinyl from 'vinyl';

import Icon from '../types/Icon';
import IconSource from '../types/IconSource';

export function getSource(): Promise<IconSource> {
	return new Promise(resolve => {
		const icons: Icon[] = [];
		const codepointsPath = require.resolve(
			'material-design-icons/iconfont/codepoints'
		);
		const rl = createInterface({
			input: createReadStream(codepointsPath, 'utf8')
		});

		rl.on('line', (line: string) => {
			const [id, unicode] = line.split(' ');

			icons.push({
				id,
				unicode
			});
		});
		rl.on('close', () => {
			resolve({
				icons
			});
		});
	});
}

export function createStream(fileName: string, content: string): Readable {
	const src = new Readable({
		objectMode: true
	});

	src._read = function () {
		this.push(new Vinyl({
			path: fileName,
			contents: Buffer.from(content)
		}));
		this.push(null);
	};

	return src;
}

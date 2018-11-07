# Google Material Design Icon Character List
[![license](https://img.shields.io/github/license/gluons/material-design-icon-chars.svg?style=flat-square)](https://github.com/gluons/material-design-icon-chars/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/material-design-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/material-design-icon-chars)
[![npm](https://img.shields.io/npm/dt/material-design-icon-chars.svg?style=flat-square)](https://www.npmjs.com/package/material-design-icon-chars)
[![Known Vulnerabilities](https://snyk.io/test/github/gluons/material-design-icon-chars/badge.svg?targetFile=package.json&style=flat-square)](https://snyk.io/test/github/gluons/material-design-icon-chars?targetFile=package.json)
[![TSLint](https://img.shields.io/badge/TSLint-gluons-15757B.svg?style=flat-square)](https://github.com/gluons/tslint-config-gluons)
[![Travis](https://img.shields.io/travis/gluons/material-design-icon-chars.svg?style=flat-square)](https://travis-ci.org/gluons/material-design-icon-chars)

The list of [Google's Material Design Icon](https://github.com/google/material-design-icons) unicode characters in several file format.

## Icon Source
Use icon code from [codepoints](https://github.com/google/material-design-icons/blob/3.0.1/iconfont/codepoints).

## Installation

### [npm](https://www.npmjs.com/)

[![NPM](https://nodei.co/npm/material-design-icon-chars.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/material-design-icon-chars)

```bash
npm install material-design-icon-chars
```

### [Yarn](https://yarnpkg.com/)

```bash
yarn add material-design-icon-chars
```

### Bower

```bash
bower install material-design-icon-chars
```

## Usage

### Assets

You can use characters list file in [character-list](./character-list) directory.  
All characters list files will be placed in this directory.

### Node API

```js
const mdIconChars = require('material-design-icon-chars');

for (const icon of mdIconChars) {
	const { id, unicode } = icon;

	console.log(`Icon ID: ${id}, Icon Unicode: ${unicode}`);
}
```

## Related

- [Font Awesome Icon Character List](https://github.com/gluons/Font-Awesome-Icon-Chars)

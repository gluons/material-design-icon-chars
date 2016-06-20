# Google Material Design Icon Character List
[![license](https://img.shields.io/github/license/gluons/material-design-icon-chars.svg?style=flat-square)](https://github.com/gluons/material-design-icon-chars/blob/master/LICENSE)
[![Bower](https://img.shields.io/bower/v/material-design-icon-chars.svg?style=flat-square)](https://github.com/gluons/material-design-icon-chars)
[![Travis](https://img.shields.io/travis/gluons/material-design-icon-chars.svg?style=flat-square)](https://travis-ci.org/gluons/material-design-icon-chars)

The list of [Google Material Design Icon](https://design.google.com/icons/) unicode character in several file format.

## Icon Source
Using icon code from [codepoints](https://github.com/google/material-design-icons/blob/master/iconfont/codepoints).

## Installation
#### Bower
```
bower install material-design-icon-chars
```

## Usage
You can use character list file in [character-list](./character-list) directory.

## Build
- Build all file.
  ```
  gulp make
  ```
  Or use default gulp task.
  ```
  gulp
  ```

- Build **CSON** file.
  ```
  gulp make:cson
  ```

- Build **JSON** file.
  ```
  gulp make:json
  ```

- Build **TOML** file.
  ```
  gulp make:toml
  ```

- Build **XML** file.
  ```
  gulp make:xml
  ```

- Build **YAML** file.
  ```
  gulp make:yaml
  ```

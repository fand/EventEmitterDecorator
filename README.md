# EventEmitterDecorator

[![build status](https://img.shields.io/travis/fand/EventEmitterDecorator/master.svg?style=flat-square)](https://travis-ci.org/fand/EventEmitterDecorator)
[![npm version](https://img.shields.io/npm/v/eventemitter-decorator.svg?style=flat-square)](https://www.npmjs.com/package/eventemitter-decorator)
[![coverage](https://img.shields.io/coveralls/fand/EventEmitterDecorator.svg)](https://coveralls.io/github/fand/EventEmitterDecorator)

## USAGE

```js
import EventEmitter from 'eventemitter-decorator';

@EventEmitter
class Foo {}

const foo = new Foo();
foo.on('hello', (name) => console.log(`hello, ${name}!!`));

foo.emit('hello', 'world');  // 'hello, world!!'
```

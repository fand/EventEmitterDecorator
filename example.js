'use strict';

import EventEmitter from './index';

class Bar {}

@EventEmitter
class Foo extends Bar {
  constructor (name) {
    super()
    this.name = name;
  }

  hey () {
    console.log('hey');
  }
}


const foo = new Foo('foooo?');

foo.on('yo', () => console.log('yo!'))

foo.emit('yo');
foo.emit('yo');
foo.emit('yo');

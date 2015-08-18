'use strict';

import EventEmitter from '../index';
import assert from 'power-assert';

describe('EventEmitter', function() {
  it('on', function () {

    @EventEmitter
    class Foo {}
    const foo = new Foo();

    let args = [];
    foo.on('yo', function () {
      args.push([].slice.call(arguments));
    });

    foo.emit('yo');
    assert(args.length === 1);
    assert(args[0].length === 0);

    foo.emit('yo', 1, 2, 3);
    assert(args.length === 2);
    assert.deepEqual(args[1], [1, 2, 3]);
  });
});

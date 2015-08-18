'use strict';

import EventEmitter from '../index';
import assert from 'power-assert';

describe('EventEmitter', function() {
  it('on, emit', function () {
    @EventEmitter
    class Foo {}
    const foo = new Foo();

    let args = [];
    foo.on('yo', function () {
      args.push([].slice.call(arguments));
    });

    foo.emit('yo');
    assert(args.length === 1, 'The listener was called');
    assert(args[0].length === 0, 'No arguments passed');

    foo.emit('yo', 1, 2, 3);
    assert(args.length === 2, 'The listener was called again');
    assert.deepEqual(args[1], [1, 2, 3], 'Arguments were passed to the listener');
  });

  it('once', function () {
    @EventEmitter
    class Foo {}
    const foo = new Foo();

    let args = [];
    foo.once('yo', function () {
      args.push([].slice.call(arguments));
    });

    foo.emit('yo');
    assert(args.length === 1, 'The listener was called');

    foo.emit('yo');
    assert(args.length === 1, 'The listener was NOT called twice');
  });

  it('addListener', function () {
    @EventEmitter
    class Foo {}
    const foo = new Foo();

    let args = [];
    foo.addListener('yo', function () {
      args.push([].slice.call(arguments));
    });

    foo.emit('yo');
    assert(args.length === 1, 'The listener was called');

    foo.emit('yo', 1, 2, 3);
    assert(args.length === 2, 'The listener was called again');
    assert.deepEqual(args[1], [1, 2, 3], 'Arguments were passed to the listener');
  });

  it('listeners', function () {
    @EventEmitter
    class Foo {}
    const foo = new Foo();

    assert.deepEqual(foo.listeners('yo'), [], 'There are no listeners');

    const listener1 = () => 1;
    const listener2 = () => 2;

    foo.on('yo', listener1);
    foo.on('yo', listener2);

    assert.deepEqual(
      foo.listeners('yo'),
      [listener1, listener2],
      'Listeners are registered'
    );
  });

});

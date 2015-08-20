'use strict';

import EventEmitter from '../index';
import assert from 'power-assert';
import sinon from 'sinon';

describe('EventEmitter', () => {

  @EventEmitter
  class Foo {}

  let foo;
  let listener = sinon.spy(_ => _);

  beforeEach(() => {
    foo = new Foo();
    listener.reset();
  });

  it('on, emit', () => {
    foo.on('yo', listener);

    foo.emit('yo');
    assert(listener.calledOnce, 'The listener was called');
    assert(listener.args[0].length === 0, 'No arguments passed');

    foo.emit('yo', 1, 2, 3);
    assert(listener.calledTwice, 'The listener was called again');
    assert.deepEqual(
      listener.args[1],
      [1, 2, 3],
      'Arguments were passed to the listener'
    );
  });

  it('once', () => {
    foo.once('yo', listener);

    foo.emit('yo');
    assert(listener.calledOnce, 'The listener was called');

    foo.emit('yo');
    assert(listener.calledOnce, 'The listener was NOT called twice');
  });

  it('addListener', () => {
    foo.addListener('yo', listener);

    foo.emit('yo');
    assert(listener.calledOnce, 'The listener was called');

    foo.emit('yo', 1, 2, 3);
    assert(listener.calledTwice, 'The listener was called again');
    assert.deepEqual(
      listener.args[1],
      [1, 2, 3],
      'Arguments were passed to the listener'
    );
  });

  it('listeners', () => {
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

  it('removeListener', () => {
    foo.on('yo', listener);

    foo.removeListener('yo', listener);
    foo.emit('yo');

    assert.deepEqual(foo.listeners('yo'), [], 'The listeners are removed');
    assert(listener.notCalled, 'No listeners were called');
  });

  it('removeAllListener', () => {
    const listener1 = sinon.spy(() => 1);
    const listener2 = sinon.spy(() => 2);

    foo.on('yo', listener1);
    foo.on('ho', listener2);

    foo.removeAllListeners();

    foo.emit('yo');
    foo.emit('ho');

    assert(listener1.notCalled && listener2.notCalled, 'No listeners were called');
  });

  it('setMaxListeners, getMaxListeners', () => {
    if (!foo.setMaxListeners || !foo.getMaxListeners) { return; }

    foo.setMaxListeners(1);
    assert(foo.getMaxListeners() === 1, 'set');

    const listener1 = sinon.spy(() => 1);
    const listener2 = sinon.spy(() => 2);

    foo.on('yo', listener1);
    assert.doesNotThrow(() => foo.on('yo', listener2), 'It just warns, not throw errors');

    foo.emit('yo');

    assert(listener1.calledOnce, 'listener1 called');
    assert(listener2.calledOnce, 'listener2 called');
  });

});

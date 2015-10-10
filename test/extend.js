'use strict';

import EventEmitter          from 'events';
import EventEmitterDecorator from '../src';
import assert                from 'power-assert';

const methods = [
  'addListener',
  'emit',
  'listeners',
  'on',
  'once',
  'removeAllListeners',
  'removeListener',

  'setMaxListeners',
  'getMaxListeners',
];

describe('Class', () => {

  it('throws errors when the class already has methods named same as EventEmitter methods', () => {

    methods.forEach((method) => {
      if (! EventEmitter.prototype[method]) { return; }
      assert.throws(() => {
          @EventEmitterDecorator
          class Foo {
            [method] () {}
          }
      }, `"${method}" method is already defined!`);
    });

  });

});

describe('SubClass', function() {

  it('throws errors when the base class of the class already has methods named same as EventEmitter methods', () => {

    methods.forEach((method) => {
      if (! EventEmitter.prototype[method]) { return; }
      assert.throws(() => {

          class Bar {
            [method] () {}
          }

          @EventEmitterDecorator
          class Foo extends Bar {}

      }, `"${method}" method is already defined!`);
    });

  });

});

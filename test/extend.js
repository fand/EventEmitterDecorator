'use strict';

import EventEmitter from 'events';
import EventEmitterDecorator from '../index';
import assert from 'power-assert';
import sinon from 'sinon';

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

describe('Class', function() {

  it('throws errors when the class already has methods named same as EventEmitter methods', function () {

    methods.forEach((method) => {
      if (! EventEmitter.prototype[method]) { return; }
      assert.throws(function () {
          @EventEmitterDecorator
          class Foo {
            [method] () {}
          }
      }, `"${method}" method is already defined!`);
    });

  });

});

describe('SubClass', function() {

  it('throws errors when the base class of the class already has methods named same as EventEmitter methods', function () {

    methods.forEach((method) => {
      if (! EventEmitter.prototype[method]) { return; }
      assert.throws(function () {

          class Bar {
            [method] () {}
          }

          @EventEmitterDecorator
          class Foo extends Bar {}

      }, `"${method}" method is already defined!`);
    });

  });

});

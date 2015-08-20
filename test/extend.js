'use strict';

import EventEmitter from 'events';
import EventEmitterDecorator from '../index';
import assert from 'power-assert';
import sinon from 'sinon';

describe('Class', function() {

  it('throws errors when the class already has methods named same as EventEmitter methods', function () {
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

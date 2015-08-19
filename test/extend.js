'use strict';

import EventEmitter from '../index';
import assert from 'power-assert';
import sinon from 'sinon';

describe('Class', function() {

  it('throws errors when the class already has methods named same as EventEmitter methods', function () {
    assert.throws(function () {
        @EventEmitter
        class Foo {
          on () {}
        }
    }, 'on method is already defined!');
  });
});

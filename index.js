'use strict';

import { EventEmitter } from 'events';

const emitters = new WeakMap();

export default function EventEmitterDecorator (klass) {

  if (klass.prototype.on) {
    throw new Error('"on" method is already defined!');
  }
  if (klass.prototype.off) {
    throw new Error('"off" method is already defined!');
  }

  // Get or create eventemitter for current instance
  const getEmitter = function (obj) {
    let emitter = emitters.get(obj);
    if (!emitter) {
      emitter = new EventEmitter();
      emitters.set(obj, emitter);
    }
    return emitter;
  };

  klass.prototype.on = function () {
    const emitter = getEmitter(this);
    emitter.on.apply(this, arguments);
  };

  klass.prototype.emit = function () {
    const emitter = getEmitter(this);
    emitter.emit.apply(this, arguments);
  };

}

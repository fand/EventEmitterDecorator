# EventEmitterDecorator

## USAGE

```js
import EventEmitter from 'eventemitter-decorator';

@EventEmitter
class Foo {}

const foo = new Foo();
foo.on('hello', (name) => console.log(`hello, ${name}!!`));

foo.emit('hello', 'world');
```

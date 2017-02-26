# node-object-class

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Travis CI][travis-image]][travis-url] [![codecov][codecov-image]](codecov-url)

Get object class string (e.g. `[object Object]`).

```js
import objClass from 'obj-class'

objClass({}) // [object Object]
objClass(Math) // [object Math]
objClass(async function () {}) // [object AsyncFunction]

class Foo {
  get [Symbol.toStringTag] () {
    return 'Foo'
  }
}
objClass(new Foo) // [object Foo]

function func () {}
func[Symbol.toStringTag] = 'Func'
objClass(func) = '[object Func]'

objClass.nameOnly = true
objClass(Math) // Math
objClass(async function () {}) // AsyncFunction
```

Requires `node >= 4.0.0`.

[npm-url]: https://npmjs.org/package/node-object-class
[npm-image]: http://img.shields.io/npm/v/node-object-class.svg?style=flat-square
[daviddm-url]: https://david-dm.org/chrisyip/node-object-class
[daviddm-image]: http://img.shields.io/david/chrisyip/node-object-class.svg?style=flat-square
[travis-url]: https://travis-ci.org/chrisyip/node-object-class
[travis-image]: http://img.shields.io/travis/chrisyip/node-object-class.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/chrisyip/node-object-class
[codecov-image]: https://img.shields.io/codecov/c/github/chrisyip/node-object-class.svg?style=flat-square
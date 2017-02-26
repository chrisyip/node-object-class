# node-object-class

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
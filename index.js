'use strict'

const vm = require('vm')

const sandbox = { toString: null }
const script = new vm.Script('toString = Object.prototype.toString')
const context = new vm.createContext(sandbox)
script.runInContext(context)
const toString = sandbox.toString

function objClass (obj) {
  const name = toString.call(obj)

  if (objClass.nameOnly) {
    return /^\[object (.+)\]$/.exec(name) && RegExp.$1
  }

  return name
}

objClass.nameOnly = false

module.exports = objClass

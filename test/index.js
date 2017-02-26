'use strict'

const test = require('tape')
const semver = require('semver')
const objClass = require('..')

const nodeVersion = process.versions.node

test('classes', t => {
  objClass.nameOnly = false

  class Foo {}

  t.equal(objClass(Foo), '[object Function]')
  t.equal(objClass(new Foo), '[object Object]')

  if (semver.gte(nodeVersion, '6.0.0')) {
    class Bar { get [Symbol.toStringTag] () { return 'Bar' } }
    t.equal(objClass(new Bar), '[object Bar]')
  }

  objClass.nameOnly = true

  t.equal(objClass(Foo), 'Function')
  t.equal(objClass(new Foo), 'Object')

  if (semver.gte(nodeVersion, '6.0.0')) {
    class Bar { get [Symbol.toStringTag] () { return 'Bar' } }
    t.equal(objClass(new Bar), 'Bar')
  }

  t.end()
})

test('functions', t => {
  objClass.nameOnly = false

  t.equal(objClass(function(){}), '[object Function]')

  try {
    t.equal(objClass(eval('(()=>{})')), '[object Function]')
  } catch (e) {
    t.skip('Arrow function is unsupported for current node version')
  }

  try {
    t.equal(objClass(eval('(function*(){})')), '[object GeneratorFunction]')
  } catch (e) {
    t.skip('Generator function is unsupported for current node version')
  }

  try {
    t.equal(objClass(eval('(async function(){})')), '[object AsyncFunction]')
  } catch (e) {
    t.skip('Async function is unsupported for current node version')
  }

  objClass.nameOnly = true

  t.equal(objClass(function(){}), 'Function')

  try {
    t.equal(objClass(eval('(()=>{})')), 'Function')
  } catch (e) {
    t.skip('Arrow function is unsupported for current node version')
  }

  try {
    t.equal(objClass(eval('(function*(){})')), 'GeneratorFunction')
  } catch (e) {
    t.skip('Generator function is unsupported for current node version')
  }

  try {
    t.equal(objClass(eval('(async function(){})')), 'AsyncFunction')
  } catch (e) {
    t.skip('Async function is unsupported for current node version')
  }

  t.end()
})

test('other value types', t => {
  objClass.nameOnly = false

  t.equal(objClass(null), '[object Null]')
  t.equal(objClass(undefined), '[object Undefined]')

  t.equal(objClass(1), '[object Number]')
  t.equal(objClass(new Number(1)), '[object Number]')

  t.equal(objClass('string'), '[object String]')
  t.equal(objClass(new String('string')), '[object String]')

  t.equal(objClass(true), '[object Boolean]')
  t.equal(objClass(new Boolean(true)), '[object Boolean]')

  t.equal(objClass(/\w/), '[object RegExp]')
  t.equal(objClass(new RegExp('\\w')), '[object RegExp]')

  t.equal(objClass({}), '[object Object]')
  t.equal(objClass(new Object(null)), '[object Object]')

  t.equal(objClass(new Date), '[object Date]')

  t.equal(objClass(Math), '[object Math]')

  objClass.nameOnly = true

  t.equal(objClass(null), 'Null')
  t.equal(objClass(undefined), 'Undefined')

  t.equal(objClass(1), 'Number')
  t.equal(objClass(new Number(1)), 'Number')

  t.equal(objClass('string'), 'String')
  t.equal(objClass(new String('string')), 'String')

  t.equal(objClass(true), 'Boolean')
  t.equal(objClass(new Boolean(true)), 'Boolean')

  t.equal(objClass(/\w/), 'RegExp')
  t.equal(objClass(new RegExp('\\w')), 'RegExp')

  t.equal(objClass({}), 'Object')
  t.equal(objClass(new Object(null)), 'Object')

  t.equal(objClass(new Date), 'Date')

  t.equal(objClass(Math), 'Math')

  t.end()
})

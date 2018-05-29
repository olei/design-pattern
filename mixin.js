// 织入模式

class AClass {
  constructor () {
    this.name = '1'
    this.age = 30
    this.data = {a: 1}
  }
  fn1 () {
    console.log(1)
  }
  fn2 () {
    console.log(2)
  }
}

class BClass {
  constructor () {
    this.name = '2'
  }
  fn1 () {
    console.log(3)
  }
  fn3 () {
    console.log(4)
  }
}

function mixin (...mixins) {
  class Mix {}
  for (let mixin of mixins) {
    copyProperty(Mix, mixin) // 实例
    copyProperty(Mix.prototype, mixin.prototype) // prototype
  }
  return Mix
}

function copyProperty (target, source) {
  const keys = Reflect.ownKeys(source)
  for (let key of keys) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      const source_desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, source_desc)
    }
  }
}

class DistributedEdit extends mixin(AClass, BClass) {
  constructor (props) {
    super(props)
    this.name = '3'
  }
}

const sl = new DistributedEdit()
// 观察者模式  发布订阅模式

class Publisher {
  constructor () {
    this.clientList = {}
  }
  add (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  }
  trigger (...args) {
    const type = Array.prototype.shift.call(args)
    const fns = this.clientList[type]
    if(!fns || !fns.length){
      return false
    }
    fns.forEach(fn => {
      fn.apply(null, args)
    })
  }
  remove (key, fn) {
    if (!key) return false
    const fns = this.clientList[key]
    if(!fns || !fns.length){
      return false
    }
    if (!fn) {
      this.clientList[key] = []
      return true
    }
    this.clientList[key] = fns.filter(i => i !== fn)
  }
}

let Sesamecakeshop = new Publisher()

function subscriber1 (type, name) {
  console.log('clent1', type, name)
}
 
function subscriber2 (type, name) {
  console.log('clent2', type, name)
}

function subscriber3 (type, name) {
  console.log('clent3', type, name)
}

Sesamecakeshop.add('1', subscriber1)
Sesamecakeshop.add('1', subscriber2)
Sesamecakeshop.add('2', subscriber3)

Sesamecakeshop.trigger('1', '椒盐', 'jzb')
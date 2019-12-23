// 订阅发布
const pubsub_un = function() { // 模块模式
  const topics = {}
  let uid = -1
  const publish = function(topic, context) {
    if (!topics[topic]) return false
    topics[topic].forEach(item => {
      item.fn(topic, context)
    })
  }
  const subscribe = function(topic, fn) {
    if (!topics[topic]) topics[topic] = []
    const obj = {
      id: ++uid,
      fn
    }
    topics[topic].push(obj)
    return uid
  }
  const unsubscribe = function(id) {
    for(let key in topics) {
      topics[key].forEach((item, index) => {
        if (item.id === id) {
          return topics[key].splice(index, 1)
        }
      })
    }
  }
  // 揭示模式
  return {
    pub: publish,
    sub: subscribe,
    unsub: unsubscribe
  }
}()
const msg = pubsub_un.sub('msg', function(topic, context) {
  console.log(`fn1 => ${topic}:${context}`)
})
const msg1 = pubsub_un.sub('msg', function(topic, context) {
  console.log(`fn2 => ${topic}:${context}`)
})
const email = pubsub_un.sub('email', function(topic, context) {
  console.log(`fn3 => ${topic}:${context}`)
})
pubsub_un.pub('msg', 'holle, world!')
pubsub_un.pub('email', 'holle, world!')
pubsub_un.unsub(msg1)
pubsub_un.pub('msg', 'holle, world!')

// 观察者
const controlCheckbox = document.getElementById('mainCheckbox')
const addBtn = document.getElementById('addNewObserver')
const container = document.getElementById('observersContainer')

function ObserverList () {
  this.list = []
}
ObserverList.prototype.add = function(observer) {
  if (!observer) throw new Error('没有传入观察者')
  this.list.push(observer)
}
ObserverList.prototype.Count = function() {
  return this.list.length
}
ObserverList.prototype.Get = function (i) {
  return this.list[i]
}

function Subject () {
  this.observers = new ObserverList()
}
Subject.prototype.add = function (observer) {
  this.observers.add(observer)
}
Subject.prototype.Notify = function (context) {
  const count = this.observers.Count()
  for (let i = 0; i < count; i++) {
    const item = this.observers.Get(i)
    item.upDate && item.upDate(context)
  }
}
function extend(obj, extendtion) {
  for (let key in obj) extendtion[key] = obj[key]
}
extend(new Subject, controlCheckbox)

controlCheckbox.onclick = function() {
  this.Notify(this.checked)
}

addBtn.onclick = function() {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.upDate = function(value) {
    checkbox.checked = value
  }
  controlCheckbox.add(checkbox)
  container.appendChild(checkbox)
}

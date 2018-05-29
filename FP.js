/**
 * 函数式编程
 * 核心概念 函数组件化
 * 通过不同的函数pipe出一个函数
 * 推荐类库 ramda
 */

const data = {
  result: "SUCCESS",
  interfaceVersion: "1.0.3",
  requested: "10/17/2013 15:31:20",
  lastUpdated: "10/16/2013 10:52:39",
  tasks: [
    {id: 104, complete: false,            priority: "high",
              dueDate: "2013-11-29",      username: "Scott",
              title: "Do something",      created: "9/22/2013"},
    {id: 105, complete: false,            priority: "medium",
              dueDate: "2013-11-22",      username: "Lena",
              title: "Do something else", created: "9/22/2013"},
    {id: 107, complete: true,             priority: "high",
              dueDate: "2013-11-22",      username: "Mike",
              title: "Fix the foo",       created: "9/22/2013"},
    {id: 108, complete: false,            priority: "low",
              dueDate: "2013-11-15",      username: "Punam",
              title: "Adjust the bar",    created: "9/25/2013"},
    {id: 110, complete: false,            priority: "medium",
              dueDate: "2013-11-15",      username: "Scott",
              title: "Rename everything", created: "10/2/2013"},
    {id: 112, complete: true,             priority: "high",
              dueDate: "2013-11-27",      username: "Lena",
              title: "Alter all quuxes",  created: "10/5/2013"}
  ]
}

const pipe = (...fns) => val => fns.reduce((a, b) => b(a), val)

const getO = obj => attr => obj[attr]
const getAttr = o => getO(o)('tasks')
const getF = o => o.filter(i => !i.complete)
const sortByDueDate = o => o.sort((a, b) => a.dueDate > b.dueDate)
const getFn = pipe(
  getAttr,
  getF,
  sortByDueDate
)
getFn(data)

// ---------------------------------------------------------------------

const formalGreeting = name => `Hello ${name}`
const casualGreeting = name => `Sup ${name}`
const male = name => `Mr. ${name}`
const female = name => `Mrs. ${name}`
const doctor = name => `Dr. ${name}`
const phd = name => `${name} PhD`
const md = name => `${name} M.D.`

const gred = (name, options) => {
  return pipe(
    options.male ? male : options.doctor ? doctor : female,
    options.formal ? formalGreeting : casualGreeting,
    options.md ? md : phd
  )(name)
}
gred('jzb', {formal: true, md: true})

// ---------------------------------------------------------------------

const splitStr = s => s.split(' ')
const getLen = w => w.length
const getLenArr = arr => arr.map(getLen)
const getB = (a, b) => a > b ? a: b
const getBigger = arr => arr.reduce(getB)
const getLongestWordLength = pipe(
  splitStr,
  getLenArr,
  getBigger
)
getLongestWordLength('Lorem ipsum dolor sit amet consectetur adipiscing elit')
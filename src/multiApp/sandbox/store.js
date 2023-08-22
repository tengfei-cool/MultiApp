import sandBox from './index.js'
const p = new sandBox()
const p2 = new sandBox()
p.active()
p.test = 1
p2.test = 2
p.inactive()
console.log(p.test)
console.log(window)
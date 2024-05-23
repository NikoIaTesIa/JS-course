let title = 'Lesson 02'
let screens = 'Simple, Complex, Interactive'
let screenPrice = 42
let rollback = 77
let fullPrice = 1000
let adaptive = true

console.log(typeof title, fullPrice, adaptive)
console.log(screens.length)
console.log('Сost of screen layout: ' + screenPrice + ' dollars')
console.log('Cost of website development: ' + fullPrice + ' dollars')

screens = screens.toLowerCase().split(', ')
console.log(screens)

console.log('Kickback: ' + fullPrice * (rollback / 100))
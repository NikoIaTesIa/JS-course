'use strict'

const books = document.querySelectorAll('.book')
const advertisment = document.querySelector('.adv')
const body = document.querySelector('body')
let bookListItems = books[2].querySelectorAll('ul > li')
const cloneNode = bookListItems[0].cloneNode(true)

books[0].before(books[1])
books[0].after(books[4])
books[5].after(books[2])

body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)'

books[4].querySelector('h2 > a').textContent = 'Книга 3. this и Прототипы Объектов'

advertisment.remove()

cloneNode.textContent = 'Глава 8: За пределами ES6'
bookListItems[8].after(cloneNode)

bookListItems = books[0].querySelectorAll('ul > li')
bookListItems[9].after(bookListItems[2])
bookListItems[3].after(bookListItems[6])
bookListItems[6].after(bookListItems[8])

bookListItems = books[5].querySelectorAll('ul > li')
bookListItems[1].after(bookListItems[9])
bookListItems[4].after(bookListItems[2])
bookListItems[7].after(bookListItems[5])




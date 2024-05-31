'use strict'

const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let toDoData = []

const loadData = function () {
    const loadedData = localStorage.getItem('toDoData')

    if (loadedData !== null) {
        toDoData = JSON.parse(loadedData)
    }
}

const updateData = function () {
    localStorage.setItem('toDoData', JSON.stringify(toDoData))
}

const render = function () {
    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    toDoData.forEach(function (item) {
        const listItem = document.createElement('li')
        listItem.classList.add('todo-item')
        listItem.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        if (item.completed) {
            todoCompleted.append(listItem)
        } else {
            todoList.append(listItem)
        }

        const completeBtn = listItem.querySelector('.todo-complete')
        completeBtn.addEventListener('click', function () {
            item.completed = !item.completed
            updateData()
            render()
        })

        const removeBtn = listItem.querySelector('.todo-remove')
        removeBtn.addEventListener('click', function () {
            toDoData.splice(toDoData.indexOf(item), 1)
            updateData()
            render()
        })
    })
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault()

    if (headerInput.value !== '') {
        const newTask = {
            text: headerInput.value,
            completed: false
        }

        headerInput.value = ''

        toDoData.push(newTask)
        updateData()
        render()
    }
})

loadData()
render()
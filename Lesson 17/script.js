'use strict'

class Worker {
    constructor(firstName, secondName, age, hasChild) {
        this._firstName = firstName
        this._secondName = secondName
        this._age = age
        this._hasChild = hasChild
    }

    get fisrtName() {
        return this._firstName
    }

    set firstName(value) {
        this._firstName = value
    }

    get secondName() {
        return this._secondName
    }

    set secondName(value) {
        this._secondName = value
    }

    get age() {
        return this._age
    }

    set age(value) {
        if (value < 18) throw new Error('Работник должен быть совершеннолетним!')
        this._age = value
    }

    get hasChild() {
        return this._hasChild
    }

    set hasChild(value) {
        this._hasChild = value
    }
}

class Developer extends Worker {
    constructor(firstName, secondName, age, hasChild, values) {
        super(firstName, secondName, age, hasChild)
        this._position = values[0]
        this._grade = values[1]
        this._companyName = values[2]
    }

    get position() {
        return this._position
    }

    set position(value) {
        this._position = value
    }

    get grade() {
        return this._grade
    }

    set grade(value) {
        this._grade = value
    }

    get companyName() {
        return this._companyName
    }

    set companyName(value) {
        this._companyName = value
    }
}

class Teacher extends Worker {
    constructor(firstName, secondName, age, hasChild, values) {
        super(firstName, secondName, age, hasChild)
        this._position = values[0]
        this._organization = values[1]
        this._lengthOfService = values[2]
    }

    get position() {
        return this._position
    }

    set position(value) {
        this._position = value
    }

    get lengthOfService() {
        return this._lengthOfService
    }

    set lengthOfService(value) {
        if (value < 0) throw new Error('Учебный стаж не может быть отрицательным!')
        this._lengthOfService = value
    }

    get organization() {
        return this._organization
    }

    set organization(value) {
        this._organization = value
    }
}

const form = document.getElementById('form')
const inputFirstName = document.getElementById('input-name-1')
const inputSecondName = document.getElementById('input-name-2')
const inputAge = document.getElementById('input-age')
const inputCheckbox = document.getElementById('checkbox')

const selectProfession = document.getElementById('select-profession')
const professionItems = document.querySelectorAll('.worker-form__profession-items')

const table = document.querySelector('.worker-table')
const tableBody = document.getElementById('table-body')

let workers = []

const addWorker = (value) => {
    const inputValues = []

    professionItems.forEach((item) => {
        if (item.id === value) {
            const professionInputs = item.querySelectorAll('.worker-form__item')
            professionInputs.forEach((item) => {
                inputValues.push(item.children[0].value)
            })
        }
    })

    workers.push(new window[value](inputFirstName.value, inputSecondName.value, inputAge.value, inputCheckbox.checked, inputValues))
}
const removeWorker = (workerIndex) => {
    workers.splice(workerIndex, 1)
    tableBody.querySelectorAll('tr')[workerIndex].remove()

    if (workers.length === 0) {
        table.style.display = 'none'
    }

    updateData()
}
const loadData = () => {
    const loadedData = localStorage.getItem('workers')

    if (loadedData !== null) {
        workers = JSON.parse(loadedData)

        return workers.length === 0 ? false : true
    }

    return false;
}
const updateData = () => {
    if (workers.length !== 0) {
        localStorage.setItem('workers', JSON.stringify(workers))
    } else {
        localStorage.removeItem('workers')
    }
}
const fillTable = () => {
    tableBody.innerHTML = ''

    for (let worker in workers) {
        const tableItem = document.createElement('tr')
        let tableCell = document.createElement('td')
        const removeBtn = document.createElement('button')

        tableCell.textContent = +worker + 1
        tableItem.append(tableCell)
        tableCell = document.createElement('td')

        for (let key in workers[worker]) {
            const tableCell = document.createElement('td')

            if (key === '_hasChild') {
                tableCell.textContent = workers[worker][key] ? 'Есть' : 'Нет'
            } else {
                tableCell.textContent = workers[worker][key]
            }

            tableItem.append(tableCell)
        }

        removeBtn.addEventListener('click', () => {
            removeWorker(worker)
            fillTable()
        })

        removeBtn.textContent = 'Удалить'
        tableCell.append(removeBtn)
        tableItem.append(tableCell)
        tableBody.append(tableItem)
    }
}
const reset = () => {
    inputFirstName.value = ''
    inputSecondName.value = ''
    inputAge.value = ''
    inputCheckbox.checked = false
    selectProfession.selectedIndex = 0

    professionItems.forEach((item) => {
        item.querySelectorAll('input').forEach((item) => {
            item.value = ''
        })

        if (item.querySelector('select') !== null) {
            item.querySelector('select').selectedIndex = 0
        }

        item.style.display = 'none'
    })

}
const init = () => {
    window.Developer = Developer;
    window.Teacher = Teacher;

    selectProfession.addEventListener('change', (event) => {
        if (event.target.value !== '') {
            professionItems.forEach((item) => {
                item.style.display = 'none'
            })

            document.querySelector('#' + event.target.value).style.display = 'block'
        } else {
            professionItems.forEach((item) => {
                item.style.display = 'none'
            })
        }
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        addWorker(selectProfession.value)
        updateData()

        fillTable()
        reset()
        table.style.display = 'block'
    })

    if (loadData()) {
        table.style.display = 'block'
        fillTable()
    }
}

init()
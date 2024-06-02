'use strict'

const title = document.getElementsByTagName('h1')[0]
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

const inputCms = document.getElementById('cms-open')
const hiddenCms = document.querySelector('.hidden-cms-variants')
const hiddenCmsSelect = hiddenCms.querySelector('#cms-select')
const hiddenCmsInput = hiddenCms.querySelector('#cms-other-input')

const inputRange = document.querySelector('.rollback input[type="range"]')
const rangeValue = document.querySelector('.rollback span.range-value')

const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]
const addBtn = document.querySelector('.screen-btn')

const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen')

const appData = {
    screens: [],
    screensCount: 0,
    servicesPercent: {},
    servicesNumber: {},
    allScreenPrices: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    rollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    init: function () {
        const start = this.start.bind(appData)
        const reset = this.reset.bind(appData)

        addTitle()

        startBtn.addEventListener('click', start)
        resetBtn.addEventListener('click', reset)
        addBtn.addEventListener('click', addScreenBlock)
        inputCms.addEventListener('change', updateCmsBlock)
        inputRange.addEventListener('input', updateRangeValue)
    },
    reset: function () {
        this.screens = []
        this.screensCount = 0
        this.servicesPercent = {}
        this.servicesNumber = {}
        this.allScreenPrices = 0
        this.servicePricesPercent = 0
        this.servicePricesNumber = 0
        this.rollback = 0
        this.fullPrice = 0
        this.servicePercentPrice = 0

        resetInteractions()
    },
    start: function () {
        if (this.validateScreenFields()) {
            const showResultWrapper = this.showResult.bind(appData)

            blockInteractions()

            this.addScreen()
            this.addServices()
            this.addPrices()
            this.showResult()

            inputRange.addEventListener('input', () => {
                this.servicePercentPrice = this.fullPrice - Math.round(this.fullPrice * (this.rollback / 100))
            })
            inputRange.addEventListener('input', showResultWrapper)
        } else {
            alert('Пожалуйста, заполните все поля ввода!')
        }
    },
    validateScreenFields: function () {
        for (let screen of screens) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')

            if (select.selectedIndex === 0 || input.value === '') {
                return false;
            }
        }

        if (inputCms.checked) {
            if (hiddenCmsSelect.selectedIndex === 0) {
                return false;
            }

            if (hiddenCmsSelect.value === 'other' && hiddenCmsInput.value === '') {
                return false;
            }
        }

        return true;
    },
    showResult: function () {
        this.screensCount = 0
        screens.forEach((screen) => {
            const input = screen.querySelector('input')
            this.screensCount += +input.value
        })

        total.value = this.allScreenPrices
        totalCount.value = this.screensCount
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
        fullTotalCount.value = this.fullPrice
        totalCountRollback.value = this.servicePercentPrice
    },
    addScreen: function () {
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addPrices: function () {
        this.allScreenPrices = this.screens.reduce((sum, screen) => {
            return sum + screen.price
        }, 0)

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += Math.round(this.allScreenPrices * (this.servicesPercent[key] / 100))
        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        this.fullPrice = +this.allScreenPrices + this.servicePricesPercent + this.servicePricesNumber
        if (inputCms.checked) {
            if (hiddenCmsSelect.value === 'other') {
                this.fullPrice += Math.round(this.fullPrice * (+hiddenCmsInput.value / 100))
            } else {
                this.fullPrice += Math.round(this.fullPrice * (+hiddenCmsSelect.value / 100))
            }
        }

        this.servicePercentPrice = this.fullPrice - Math.round(this.fullPrice * (this.rollback / 100))
    }
}


const addTitle = () => document.title = title.textContent
const addScreenBlock = () => {
    const cloneScreen = screens[0].cloneNode(true)

    cloneScreen.querySelector('input').value = ''
    screens[screens.length - 1].after(cloneScreen)

    screens = document.querySelectorAll('.screen')
}
const updateCmsBlock = () => {
    const hiddenCmsInputBlock = hiddenCms.querySelector('.main-controls__input')

    if (inputCms.checked) {
        hiddenCms.style.display = 'flex'
        hiddenCmsSelect.addEventListener('change', (event) => {
            if (event.target.value === 'other') {
                hiddenCmsInputBlock.style.display = 'block'
            } else {
                hiddenCmsInputBlock.style.display = 'none'
            }
        })
    } else {
        hiddenCms.style.display = 'none'
        hiddenCmsInputBlock.style.display = 'none'
    }
}
const updateRangeValue = () => {
    rangeValue.textContent = inputRange.value + '%'
    appData.rollback = +inputRange.value
}
const blockInteractions = () => {
    const hiddenCmsSelect = hiddenCms.querySelector('#cms-select')
    const hiddenCmsInput = hiddenCms.querySelector('#cms-other-input')

    startBtn.style.display = 'none'
    resetBtn.style.display = 'block'

    screens.forEach((screen) => {
        const select = screen.querySelector('select')
        const input = screen.querySelector('input')

        select.disabled = true
        input.disabled = true
    })

    addBtn.disabled = true

    otherItemsPercent.forEach((item) => {
        const check = item.querySelector('input[type="checkbox"]')
        check.disabled = true
    })
    otherItemsNumber.forEach((item) => {
        const check = item.querySelector('input[type="checkbox"]')
        check.disabled = true
    })

    inputCms.disabled = true
    hiddenCmsSelect.disabled = true
    hiddenCmsInput.disabled = true
}
const resetInteractions = () => {
    const cloneScreen = screens[0].cloneNode(true)

    cloneScreen.querySelector('input').value = ''
    screens.forEach((screen) => {
        screen.after(cloneScreen)
        screen.remove()
    })
    screens = document.querySelectorAll('.screen')

    screens.forEach((screen) => {
        const select = screen.querySelector('select')
        const input = screen.querySelector('input')

        select.disabled = false
        input.disabled = false
    })

    addBtn.disabled = false

    otherItemsPercent.forEach((item) => {
        const check = item.querySelector('input[type="checkbox"]')
        check.disabled = false
        check.checked = false
    })
    otherItemsNumber.forEach((item) => {
        const check = item.querySelector('input[type="checkbox"]')
        check.disabled = false
        check.checked = false
    })

    inputCms.disabled = false
    inputCms.checked = false
    hiddenCmsSelect.disabled = false
    hiddenCmsSelect.selectedIndex = 0
    hiddenCmsInput.disabled = false
    hiddenCmsInput.value = ''
    updateCmsBlock()

    inputRange.value = 0
    updateRangeValue()

    total.value = 0
    totalCount.value = 0
    totalCountOther.value = 0
    fullTotalCount.value = 0
    totalCountRollback.value = 0

    resetBtn.style.display = 'none'
    startBtn.style.display = 'block'
}
const logger = (data) => console.log(data)

appData.init()
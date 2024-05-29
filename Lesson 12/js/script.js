'use strict'

const title = document.getElementsByTagName('h1')[0]
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')

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
    title: '',
    screens: [],
    screensCount: 0,
    servicesPercent: {},
    servicesNumber: {},
    adaptive: true,
    allScreenPrices: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    rollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    init: function () {
        appData.addTitle()

        startBtn.addEventListener('click', appData.start)
        addBtn.addEventListener('click', appData.addScreenBlock)
        inputRange.addEventListener('input', appData.updateRangeValue)
    },
    addTitle: function () {
        document.title = title.textContent
    },
    start: function () {
        if (appData.validateScreenFields()) {
            appData.addScreen()
            appData.addServices()

            appData.addPrices()

            appData.showResult()

            inputRange.addEventListener('input', appData.addPrices)
            inputRange.addEventListener('input', appData.showResult)
        } else {
            alert('Пожалуйста, заполните все поля в разделе "Расчет по типу экрана"!')
        }

        // appData.logger()
    },
    validateScreenFields: function () {
        for (let screen of screens) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')

            if (select.selectedIndex === 0 || input.value === '') {
                return false;
            }
        }

        return true;
    },
    showResult: function () {
        total.value = appData.allScreenPrices
        totalCount.value = appData.screensCount
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
        fullTotalCount.value = appData.fullPrice
        totalCountRollback.value = appData.servicePercentPrice
    },
    addScreen: function () {
        appData.screens = []

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent

            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value
            })
        })
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            } else if (appData.servicesPercent.hasOwnProperty(label.textContent)) {
                delete appData.servicesPercent[label.textContent]
            }
        })

        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type="checkbox"]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type="text"]')

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            } else if (appData.servicesNumber.hasOwnProperty(label.textContent)) {
                delete appData.servicesNumber[label.textContent]
            }
        })
    },
    addPrices: function () {
        appData.allScreenPrices = appData.screens.reduce(function (sum, screen) {
            return sum + screen.price
        }, 0)

        appData.servicePricesPercent = 0
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += Math.round(appData.allScreenPrices * (appData.servicesPercent[key] / 100))
        }

        appData.servicePricesNumber = 0
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        appData.fullPrice = 0
        appData.fullPrice = +appData.allScreenPrices + appData.servicePricesPercent + appData.servicePricesNumber

        appData.servicePercentPrice = appData.fullPrice - Math.round(appData.fullPrice * (appData.rollback / 100))

        appData.screensCount = 0
        screens.forEach(function (screen) {
            const input = screen.querySelector('input')
            appData.screensCount += +input.value
        })
    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true)

        cloneScreen.querySelector('input').value = ''
        screens[screens.length - 1].after(cloneScreen)

        screens = document.querySelectorAll('.screen')
    },
    updateRangeValue: function (event) {
        rangeValue.textContent = event.target.value + '%'
        appData.rollback = +event.target.value
    },
    logger: function () {
        console.log(appData);
    }
}

appData.init()
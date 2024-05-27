'use strict'

const appData = {
    title: '',
    screens: [], 
    services: [],
    adaptive: true,
    allScreenPrices: 0,
    allServicePrices: 0,
    rollback: 10,
    fullPrice: 0,
    servicePercentPrice: 0,

    start: function() {
        this.asking()
        this.addPrices()
        this.getFullPrice()
        this.getServicePercentPrice()
        this.getTitle()

        this.logger()
    },
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num) && num !== null
                && (typeof num === 'number' || typeof num === 'string' && num.trim() !== "");
    },
    isString: function(str) {
        return !this.isNumber(str) && str.trim() !== ""
    },
    asking: function() {
        do {
            this.title = prompt("Как называется ваш проект?", "Калькулятор верстки").trim()
        } while (!this.isString(this.title))
         
        for (let i = 0; i < 2; ++i) {
            let name = ''
            let price = 0

            do {
                name = prompt("Какие типы экранов нужно разработать?")
            } while (!this.isString(name))

            do {
                price = prompt("Сколько будет стоить данная работа?")
            } while (!this.isNumber(price))

            this.screens.push({ id: i, name: name.trim(), price: +price })
        }

        for (let i = 0; i < 2; ++i) {
            let name = ''
            let price = 0

            do {
                name = prompt("Какой дополнительный тип услуги нужен?")
            } while (!this.isString(name))

            do {
                price = prompt("Сколько это будет стоить?")
            } while (!this.isNumber(price))

            this.services.push({ id: i, name: name.trim(), price: +price })
        }

        this.adaptive = confirm("Нужен ли адаптив на сайте?")
    },
    addPrices: function() {
        this.allScreenPrices = this.screens.reduce(function(sum, screen) {
            return sum + screen.price
        }, 0)

        this.allServicePrices = this.services.reduce(function(sum, service) {
            return sum + service.price
        }, 0)
    },
    getFullPrice: function() {
        this.fullPrice = +this.allScreenPrices + this.allServicePrices
    },
    getServicePercentPrice: function() {
        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100))
    },
    getTitle: function() {
        this.title = this.title.trim()[0].toUpperCase() + this.title.trim().substring(1).toLowerCase()
    },
    getRollbackMessage: function(price) {
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price >= 0 && price < 15000) {
            return "Скидка не предусмотрена";
        } else {
            return "Что-то пошло не так"
        }
    },
    logger: function() {
        console.log(this.fullPrice);
        console.log(this.servicePercentPrice);
    }
}

appData.start()





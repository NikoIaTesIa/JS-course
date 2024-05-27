'use strict'

const dateWidget = {
    data: new Date(),
    day: 0,
    date: 0,
    month: 0,
    year: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    weekDayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресение'],
    monthNames: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    dateFormat1: '',
    dateFormat2: '',

    header: document.createElement('h1'),
    dateDisplay1: document.createElement('h3'),
    dateDisplay2: document.createElement('h3'),

    start: function () {
        this.data = new Date()
        this.day = this.data.getDay()
        this.date = this.data.getDate()
        this.month = this.data.getMonth()
        this.year = this.data.getFullYear()
        this.hours = this.data.getHours()
        this.minutes = this.data.getMinutes()
        this.seconds = this.data.getSeconds()

        this.dateFormat1 = 'Сегодня ' + this.getDayName(this.day) + ', ' + this.date + ' ' + this.monthNames[this.month] + ' ' +
            this.year + ' года, ' + this.hours + ' ' + this.getHoursName(this.hours) + ' ' + this.minutes +
            ' минут ' + this.seconds + ' секунды'

        this.dateFormat2 = this.data.toLocaleDateString() + ' - ' + this.data.toLocaleTimeString()

        document.body.appendChild(this.header)
        document.body.appendChild(this.dateDisplay1)
        document.body.appendChild(this.dateDisplay2)
    },
    getDayName: function (dayNum) {
        return this.weekDayNames[(dayNum + 6) % 7]
    },
    getHoursName: function (hourNum) {
        switch (hourNum) {
            case 1:
            case 21:
                return 'час';
                break;
            case 2:
            case 3:
            case 4:
            case 22:
            case 23:
                return 'часа';
                break;
            default:
                return 'часов';
        }
    },
    foo: function () {
        this.start()
    },
    display: function () {
        dateWidget.start()
        dateWidget.header.textContent = 'Дата и время'
        dateWidget.dateDisplay1.textContent = dateWidget.dateFormat1
        dateWidget.dateDisplay2.textContent = dateWidget.dateFormat2
    }
}

setInterval(dateWidget.display, 1000)

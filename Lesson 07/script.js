'use strict'

let weekWidget = {
    header: document.createElement('h1'),
    list: document.createElement('ul'),
    weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

    constructor: function() {
        this.header.textContent = 'Days of the week'
        this.list.innerHTML = ''

        for (let key of this.weekDays) {
            const item = document.createElement('li')
            const date = new Date()
            let modifier

            if (key === 'Saturday' || key === 'Sunday') {
                modifier = document.createElement('em')
                modifier.appendChild(document.createTextNode(key))
                item.appendChild(modifier)
            } else {
                item.appendChild(document.createTextNode(key))
            }

            if (this.weekDays.indexOf(key) === (date.getDay() + 6) % 7) {
                modifier = document.createElement('strong')
                modifier.appendChild(item.firstChild)
                item.appendChild(modifier)
            }
    
            this.list.appendChild(item)
        }

        document.body.appendChild(this.header)
        document.body.appendChild(this.list)
    }
}

weekWidget.constructor()





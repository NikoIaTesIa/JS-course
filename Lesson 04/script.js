'use strict';

const stringHandler = function(str) {
    if (typeof str != 'string') {
        return 'Введены данные неверного типа';
    }

    str = str.trim()

    if (str.length > 30) {
        return str.slice(0, 30) + '...';
    }

    return str;
}

alert(stringHandler(prompt('Введите строку для обработки:')))
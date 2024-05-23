'use strict';

let lang = 'en'
let weekDaysRU = ['Понедельник', 'Вторник', 'Среда',
    'Четверг', 'Пятница', 'Суббота', 'Воскресение']
let weekDaysEN = ['Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday']

// Solution #1
if (lang == 'ru') {
    for (let i = 0; i < weekDaysRU.length; ++i) {
        console.log(weekDaysRU[i]);
    }
}

if (lang == 'en') {
    for (let i = 0; i < weekDaysEN.length; ++i) {
        console.log(weekDaysEN[i]);
    }
}

// Solution #2
switch (lang) {
    case 'ru':
        for (let i = 0; i < weekDaysRU.length; ++i) {
            console.log(weekDaysRU[i]);
        }
        break
    case 'en':
        for (let i = 0; i < weekDaysEN.length; ++i) {
            console.log(weekDaysEN[i]);
        }
        break
    default:
        console.log('Use correct language');
}

// Solution #3
let weekDays = [];
weekDays['ru'] = weekDaysRU
weekDays['en'] = weekDaysEN

for (let i = 0; i < weekDays[lang].length; ++i) {
    console.log(weekDays[lang][i]);
}

// Solution #4
const weekDays_ = {
    'ru': weekDaysRU,
    'en': weekDaysEN,
};

for (let i = 0; i < weekDays_[lang].length; ++i) {
    console.log(weekDays_[lang][i]);
}

console.log(weekDays)
const greetingMsg = document.getElementById('greeting-msg')
const dayInfo = document.getElementById('day-info')
const timeInfo = document.getElementById('time-info')
const newYearInfo = document.getElementById('new-year-info')

const dateInfoWidget = () => {
    const weekDays = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресение'
    ]

    const todayDate = new Date()
    const newYearDate = new Date('1 january 2024')
    const day = weekDays[(todayDate.getDay() + 6) % 7]
    let daysRemaining

    const getGreeting = (hours) => {
        switch (true) {
            case (hours >= 0 && hours < 6):
                return 'Доброй ночи';
                break;
            case (hours >= 6 && hours < 12):
                return 'Доброе утро';
                break;
            case (hours >= 12 && hours < 18):
                return 'Добрый день';
                break;
            case (hours >= 18 && hours <= 23):
                return 'Добрый вечер';
                break;
            default:
                break;
        }
    }

    newYearDate.setFullYear(todayDate.getFullYear() + 1)
    daysRemaining = Math.ceil((newYearDate.getTime() - todayDate.getTime()) / 1000 / 60 / 60 / 24)

    greetingMsg.textContent = getGreeting(todayDate.getHours())
    dayInfo.textContent = `Сегодня: ${day}`
    timeInfo.textContent = `Текущее время: ` +
        `${todayDate.getHours() % 12 >= 10 || todayDate.getHours() % 12 === 0 ? '' : '0'}` +
        `${todayDate.toLocaleTimeString('en')}`
    newYearInfo.textContent = `До нового года осталось ${daysRemaining}  дней`
}

setInterval(dateInfoWidget, 1000)
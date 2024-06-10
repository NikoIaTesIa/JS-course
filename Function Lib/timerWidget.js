const timerWidget = (deadline) => {
    const timerHours = document.getElementById('timer-hours')
    const timerMinutes = document.getElementById('timer-minutes')
    const timerSeconds = document.getElementById('timer-seconds')
    let intervalId

    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime()
        let dateNow = new Date().getTime()
        let timeRemaining = (dateStop - dateNow) / 1000

        let hours = Math.floor(timeRemaining / 60 / 60)
        let minutes = Math.floor((timeRemaining / 60) % 60)
        let seconds = Math.floor(timeRemaining % 60)

        return { timeRemaining, hours, minutes, seconds }
    }

    const updateTimer = () => {
        let timeData = getTimeRemaining()

        if (timeData.timeRemaining > 0) {
            timerHours.textContent = timeData.hours >= 10 ? timeData.hours : '0' + timeData.hours
            timerMinutes.textContent = timeData.minutes >= 10 ? timeData.minutes : '0' + timeData.minutes
            timerSeconds.textContent = timeData.seconds >= 10 ? timeData.seconds : '0' + timeData.seconds
        } else {
            timerHours.textContent = '00'
            timerMinutes.textContent = '00'
            timerSeconds.textContent = '00'

            clearInterval(intervalId)
        }

        if (intervalId === undefined) {
            intervalId = setInterval(updateTimer, 1000)
        }
    }

    updateTimer()
}

export default timerWidget
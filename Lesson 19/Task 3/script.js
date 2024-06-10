const rocket = document.getElementById('rocket')
const toggleBtn = document.getElementById('toggle')
const resetBtn = document.getElementById('reset')

const windowRatio = window.innerHeight / window.innerWidth

let isActive = false
let idAnimation
let step = 0;
let accelerationRation = 1;

const flyAnimation = () => {

    const start = () => {
        step++
        accelerationRation += 0.1
        idAnimation = requestAnimationFrame(start)

        if (isActive === false) {
            cancelAnimationFrame(idAnimation)
        }
        else {
            if (step < 120) {
                rocket.style.bottom = step * accelerationRation * windowRatio + 'px'
                rocket.style.left = 50 + step * accelerationRation + 'px'
            } else {
                cancelAnimationFrame(idAnimation)
            }
        }
    }

    start()
}

toggleBtn.addEventListener('click', (event) => {
    isActive = !isActive

    if (isActive) { event.target.textContent = 'Pause' }
    else event.target.textContent = 'Continue'

    flyAnimation()
})

resetBtn.addEventListener('click', () => {
    isActive = false
    step = 0
    accelerationRation = 1

    flyAnimation()

    rocket.style.left = '50px'
    rocket.style.bottom = '0px'

    toggleBtn.textContent = 'Start'
})


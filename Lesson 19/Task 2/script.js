const input = document.getElementById('input')
const text = document.getElementById('text')

const debounce = (func, delay) => {
    let timeout
    return function (...args) {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            func(...args)
        }, delay)
    };
}

const showText = (value) => {
    if (value !== '') {
        text.textContent = value
        text.style.color = 'black'
    }
    else {
        text.textContent = 'Text'
        text.style.color = 'transparent'
    }
}
const debouncedShowText = debounce(() => {
    showText(input.value)
}, 300)

input.addEventListener('input', debouncedShowText)
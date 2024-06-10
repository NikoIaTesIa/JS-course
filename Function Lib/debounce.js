const debounce = (func, delay) => {
    let timeout
    return function (...args) {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            func(...args)
        }, delay)
    };
}

export default debounce

// Usage example
/*

const someFunc = (value) => {
    console.log(value);
}
    
const debouncedSomeFunc = debounce(() => {
    someFunc(value)
}, 1000)

listenedElem.addEventListener('eventName', debouncedSomeFunc)

*/
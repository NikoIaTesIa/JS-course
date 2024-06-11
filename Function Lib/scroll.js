const scroll = (elem) => {
    const elemTarget = document.getElementById(elem.getAttribute('href').slice(1))

    elemTarget.scrollIntoView({ block: "start", behavior: "smooth" })
}

// Usage example
/*

const linkItems = document.querySelectorAll('menu > ul > li > a')

linkItems.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault()
        scroll(item)
    })
})

*/

export default scroll
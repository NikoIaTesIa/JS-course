'use strict'

const DomElement = function (selector, height, width, bg, fontSize, innerText) {
    this.selector = selector
    this.height = height
    this.width = width
    this.bg = bg
    this.fontSize = fontSize
    this.innerText = innerText
}

DomElement.prototype.createElement = function () {
    if (this.selector[0] === '.') {
        this.node = document.createElement('div')
        this.node.classList.add(this.selector.slice(1))
    } else {
        this.node = document.createElement('p')
        this.node.id = this.selector.slice(1)
    }

    this.node.style.cssText = `
        height: ${this.height};
        width: ${this.width};
        background: ${this.bg};
        font-size: ${this.fontSize}
    `;

    this.node.innerText = this.innerText

    document.body.append(this.node)
}

window.addEventListener('keydown', (e) => {
    let style = getComputedStyle(elem.node);
    const top = parseInt(style.top)
    const left = parseInt(style.left)

    switch (e.code) {
        case 'ArrowUp':
            elem.node.style.top = top - 10 + 'px'
            break;
        case 'ArrowDown':
            elem.node.style.top = top + 10 + 'px'
            break;
        case 'ArrowLeft':
            elem.node.style.left = left - 10 + 'px'
            break;
        case 'ArrowRight':
            elem.node.style.left = left + 10 + 'px'
            break;
        default:
            break;
    }
})

const elem = new DomElement('.block', '100px', '100px', 'lightGreen', '16px', '')

elem.createElement()
elem.node.style.cssText += `position: absolute`
elem.node.style.cssText += `left: ${window.innerWidth / 2 - 50}px`
elem.node.style.cssText += `top: ${window.innerHeight / 2 - 50}px`
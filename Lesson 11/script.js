'use strict'

const btn = document.getElementById('btn')

const input = document.getElementById('text')
const inputRange = document.getElementById('range')
const rangeSpan = document.getElementById('range-span')

const square = document.getElementById('square')
const circle = document.getElementById('circle')
const eBtn = document.getElementById('e_btn')

const setColor = function () {
    square.style.backgroundColor = input.value
}

const circleResize = function () {
    circle.style.height = inputRange.value + '%'
    circle.style.width = inputRange.value + '%'
}

const showValue = function (event) {
    rangeSpan.textContent = event.target.value
}

btn.addEventListener('click', setColor)
inputRange.addEventListener('input', circleResize)
inputRange.addEventListener('input', showValue)

eBtn.style.display = 'none'
rangeSpan.textContent = inputRange.value
circleResize()
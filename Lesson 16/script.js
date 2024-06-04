'use strict'

class First {
    constructor() { }
    hello() {
        console.log("Hi, I'm a parent's method!");
    }
}

class Second extends First {
    hello() {
        super.hello()
        console.log("And I am an inherited method!");
    }
}

const newInstance = new Second()

newInstance.hello()
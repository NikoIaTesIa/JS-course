'use strict';

// Task #1
let num
let flag = false

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== null
            && (typeof num == 'number' || typeof num == 'string' && num.trim() != "");
}

while (!flag) {
    num = prompt("Enter a number:")
    flag = isNumber(num)
    if (flag) {
        num = +(num.trim())
    }
}

// Task #2.1
let arr = [
    '2353461', '329946',
    '4344600', '111788',
    '7896807', '270345',
    '4000321'
]

for (let i = 0; i < arr.length; ++i) {
    if (+arr[i][0] == 2 || +arr[i][0] == 4) {
        console.log(arr[i]);
    }
}

// Task #2.2
const isPrime = function(num) {
    let primeDivisors = [2, 3, 5, 7]
    let flag = true

    for (let i = 0; i < primeDivisors.length; ++i) {
        if (num != primeDivisors[i]) {
            if (num % primeDivisors[i] == 0) {
                flag = false
                break;
            }
        } else return true;
    }

    return flag;
}

for (let i = 1; i <= 100; ++i) {
    if (isPrime(i)) {
        console.log('Number divisors: 1 and ' + i);
    }
}
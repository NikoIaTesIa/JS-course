let num = 266219
let mult = 1

let numStr = num.toString()
for (let i = 0; i < numStr.length; ++i) {
    mult *= +(numStr[i])
}

mult **= 3
let multStr = mult.toString()
console.log(multStr[0], multStr[1])
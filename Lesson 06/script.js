'use strict'

const gameProcess = function() {
    let randNum = Math.floor(Math.random() * 100) + 1;
    let attempts = 10

    const guessNumberBot = function(randNum, attempts) {
        
        let num = prompt("Guess the number from 1 to 100:\n" + "You have " + attempts + " attempts")

        const handleNumber = function() {
            if (num === null) {
                alert("Game over.")
                return;
            }
            
            if (isNumber(num)) {
                num = +(num.trim())
                
                attempts--
                if (attempts === 0) {
                    let answer = confirm("The attempts are over.\nWould you like to play again?")
                    if (answer) { gameProcess() } 
                    else { alert("Game over. Thanks for playing!") }
                    return;
                }
                
                if (randNum > num) {
                    num = prompt("The hidden number is greater! Attempts left: " + attempts + "\nTry another number:")
                    handleNumber()

                } else if (randNum < num) {
                    num = prompt("The hidden number is less! Attempts left: " + attempts + "\nTry another number:")
                    handleNumber()
                    
                } else if (randNum === num) {
                    let answer = confirm("Congratulations, you guessed it!\nWould you like to play again?")
                    if (answer) { gameProcess() } 
                    else { alert("Game over. Thanks for playing!") }
                }

            } else {
                num = prompt("Enter the number!")
                handleNumber()
            }
        }

        handleNumber()
    }

    guessNumberBot(randNum, attempts)
}

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num) && num !== null
            && (typeof num == 'number' || typeof num == 'string' && num.trim() != "");
}

gameProcess()




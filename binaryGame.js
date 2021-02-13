let max = 100;
let min = 1;
let nGuesses = 0;
let currGuess = 0; //Global variable, which is why we can always call currGuess in all our functions.  Even when currGuess has changed in the tryGuess function, you can still use the variable with the new value.
/* getElementById would be fine to use below as well instead of querySelector */
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const higherBtn = document.querySelector("#higherBtn");
const lowerBtn = document.querySelector("#lowerBtn");
const startBtn = document.querySelector("#startBtn");
const guessBtn = document.querySelector("#guessBtn");
const instructions = document.querySelector("#instructions");
const resetBtn= document.querySelector("#resetBtn"); //Variable given to the Reset button

startBtn.addEventListener("click", tryGuess); //Creates ? to let computer guess the number 
/* A note about the lines below: If you are passing arguments to an event handler function as in the addEventListener calls below, you need to wrap it in a function expression or arrow function so that it doesn't fire when the addEventListener call is reached. You do NOT need to know about this for this assignment, but if you want to read about it, see the documentation here: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Event_listener_with_an_arrow_function */
yesBtn.addEventListener("click", () => isGuessCorrect(true)); //Yes button means the computer guessed the correct number.
noBtn.addEventListener("click", () => isGuessCorrect(false)); //No button means the computer didn't guess the correct number and has to guess again.
higherBtn.addEventListener("click", () => numIsHigher(true)); //Higher button means the computer's next guess has to be higher.
lowerBtn.addEventListener("click", () => numIsHigher(false)); //Lower button means the computer's next guess has to be lower.
resetBtn.addEventListener("click", () => playAgain()); //Reset button lets the user play the game again. It doesn't need an argument because it only works when Reset is clicked.

toggleBtns([startBtn], true); //This will show the ? button for the user to let the game begin.

function tryGuess(){ 
    if (!nGuesses) { // first time guessing
        toggleBtns([startBtn], false);
        toggleBtns([guessBtn], true); //guessBtn is the button that displays the computer's guess.
    }
    nGuesses++;    
    currGuess = Math.floor((max - min)/2) + min;
    console.log(`Guessing between ${min} and ${max} - guessing ${currGuess} - this is guess number ${nGuesses}`);
    guessBtn.textContent = currGuess + "!"; //textContent will show the text that is after the equal sign. guessBtn is the button that displays the computer's guess.
    instructions.textContent = "Am I correct?";
    toggleBtns([yesBtn, noBtn], true); //This will show the Yes or No button that user can click on to say if the computer's guess is correct. Placing the buttons in square brackets creates the array (btnsArray).  True means that the buttons in the array will show.
}

//How does this work?
function toggleBtns(btnsArray, on) { //btnsArray is a predefined parameter, this is just a name for the array of buttons. The on turns on the Boolean (true or false). Parameters btn
    for (let btn = 0; btn < btnsArray.length; btn++) {
        if (on) { //if(on)= if(true)
            btnsArray[btn].style.display = "inline-block"; //This will display the buttons when the parameter is equal to true.
        } else {
            btnsArray[btn].style.display = "none"; //This will not display the buttons when the parameter is equal to false.
        }
    }
}

//Function that determines if the guess is correct or not
function isGuessCorrect(correct) {
    toggleBtns([yesBtn, noBtn], false); //False means to turn off the buttons for Yes and No button
    if (correct) {
        instructions.textContent = `I guessed your number in ${nGuesses} tries!`;
        //Code to have reset button show up once the computer guesses the correct value
        toggleBtns([resetBtn], true); //True means that it turns on the Reset button.
    } else {
        toggleBtns([higherBtn, lowerBtn], true);
        instructions.textContent = `Is your number higher or lower than ${currGuess}?`;   
    }
} 
  
function numIsHigher(higher) {
    if (higher) {
        if(currGuess===100) { //If the computer's guess is 100, then this nested function will work.
            fixBug(); //The function fixBug() will then run when currGuess===100.
            return; //Stops the function for numIsHigher.
        }
        min = currGuess + 1;
        console.log("Changing the minimum to: " + min);       
    } else {
            if(currGuess===1) { //If the computer's guess is 1, then this nested function will work.
            fixBug(); //The function fixBug() will then run when currGuess===1.
            return; //Stops the function for numIsHigher.
            }
        max = currGuess - 1;
        console.log("Changing the maximum to: " + max);      
    }
    toggleBtns([higherBtn, lowerBtn], false);
    tryGuess();
}

function playAgain() {
  //Reset the values.
  max = 100;
  min = 1;
  nGuesses = 0;
  currGuess = 0;
   
    toggleBtns([startBtn], true);  //This will create the question mark start button.
    toggleBtns([resetBtn, guessBtn], false); //Hides guess answer from the first try and reset button.
    instructions.textContent = "Think of a number between 1-100 and click the blue button when you're ready."; //This will show the message of guessing the number.   
}

function fixBug() {    
    //This code will show when the user tells the computer to guess a number that is greater than 1 and higher than 100.
    instructions.textContent= "Your guess has to be between 1 and 100. The game will then restart if you click on the Restart button."
    toggleBtns([higherBtn, lowerBtn], false); //The Higher and Lower buttons will not show.
    toggleBtns([resetBtn], true); //The Reset button will show up for the user to click on and restart the game (it will then start the playAgain() function).  
}

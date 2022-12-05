const resetBtn = document.querySelector('#reset-btn')
const checkBtn = document.querySelector('#check-btn')
const guessInput = document.querySelector('#guess')
const guessHistory = document.querySelector('#history')
const hintMsg = document.querySelector('.hint-msg')
const userScoreElem = document.querySelector('#highscore')
const numOfGuessesElem = document.querySelector('#num-of-guess')
const guessImgElem = document.querySelector('#guessImg')


let randomNum = Math.floor(Math.random() * 100);
let numOfGuesses = 10
let userScore;
var input = document.getElementById("guess");


// images
let correctImg = 'https://media.istockphoto.com/vectors/checkmark-icon-check-mark-vector-isolated-illustration-vector-id1205148147?k=20&m=1205148147&s=612x612&w=0&h=6WoITHTxFwIBVnfODxsh7wAzU3-AZFkg0YZ5U_8COqw='
let wrongImg = 'https://media.istockphoto.com/vectors/cross-icon-x-vector-sign-flat-style-cross-red-colored-icon-vector-vector-id1210969290?k=20&m=1210969290&s=612x612&w=0&h=BsSfWnpQkMC-CC9OMrbDEskLpirNWP6Sq35b4wPmfYM='
let guessImg = 'https://bolderadvocacy.org/wp-content/uploads/2018/08/blue-icon-question-mark-image.png'


console.log(randomNum)

// event handlers
resetBtn.addEventListener('click', (evt) => {
    randomNum = Math.floor(Math.random() * 100);
    numOfGuesses = 10
    numOfGuessesElem.innerText = '10'
    
    guessImgElem.src = guessImg
    
    guessInput.value = ''
    hintMsg.innerText = 'Guess a number'
    removeStyles()
    checkBtn.disabled = false
    
    guessHistory.innerHTML = ''
    
    console.log(randomNum)
})

checkBtn.addEventListener('click', function (eventObj) {
    const usersGuess = parseInt(guessInput.value)
    
    if( userScore == undefined){
        userScore = 0
        userScoreElem.innerText = userScore
    }

    // game over: you win!
    if (usersGuess === randomNum) { 
        eventObj.target.disabled = true

        if(userScore > numOfGuesses){
        }else{
            userScore = numOfGuesses
            userScoreElem.innerText = userScore
        }
        
        guessImgElem.src = correctImg

        changeHintText(usersGuess, true)
        resetEnterKey()

        return
    } 
        
    // change hint text for high/low guesses
    if(guessInput.value != ""){
        changeHintText(usersGuess)

        // add history
        showUserHistory(usersGuess)
    
        numOfGuesses--
        numOfGuessesElem.innerText = numOfGuesses
        
        if (numOfGuesses === 0) {
            eventObj.target.disabled = true
            guessImgElem.src = wrongImg
            
            changeHintText(usersGuess, false)
            
            resetEnterKey()
            return
        }
        guessInput.focus()
    }else{
        changeHintText("error")
    }
})


// helper funtions
function showUserHistory(usersGuess) {
    const pTag = document.createElement('p')
    pTag.innerText = usersGuess
    guessHistory.appendChild(pTag)
}

function changeHintText(usersGuess, correctGuess) {

    if(correctGuess == true){
        applyClass(hintMsg, `YOU WIN! \n The correct number is ${randomNum}`,  'hint-success')
        return
    }else if (correctGuess == false){
        applyClass(hintMsg, `YOU LOSE! \n The correct number is ${randomNum}`, 'hint-fail')
        return
    }

    if(typeof(usersGuess) == 'number'){
        if (usersGuess < randomNum) {
            applyClass(hintMsg, 'TOO LOW', 'hint-low')
        }else{
            applyClass(hintMsg, 'TOO HIGH', 'hint-high')
        }
    }else{
        applyClass(hintMsg, 'Please Enter a Number', 'hint-error')
    }
}

function applyClass (elem, text, addCls) {
    elem.innerText = text
    removeStyles()
    elem.classList.add(addCls)
}

function removeStyles(){
    hintMsg.classList.remove("hint-high", "hint-low", "hint-success", "hint-fail" , 'hint-error')
}

function resetEnterKey(){
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("reset-btn").click();
        }
    },{once:true});
}

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("check-btn").click();
    }
});


// initialize variables
const X_CLASS='x'
const CIRCLE_CLASS='circle'
const WINNING_COMBINATIONS =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessageElement= document.getElementById('winningMessage')
const  winningMessageTextElement =document.querySelector('[data-winning-messsage-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn
// starting game
startGame()
restartButton.addEventListener('click',startGame)

function startGame(){
    circleTurn=false
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
    })
     setBoardHoverClass()
     winningMessageElement.classList.remove('show')
}
// placing the mark ,switching turns,checking win
function handleClick(e){
    const cell=e.target
    const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()){
        endGame(true)

    }else{
        swapTurns()
        setBoardHoverClass()
    }
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn=!circleTurn
}
function checkWin(currentClass){
    // check all our winning combinations to see some of the winning combinations are met by the current combinations
    return WINNING_COMBINATIONS.some(combination=>{
        // this will return true if any of the values inside of it is true
        // it will loop over all other different combination
        return combination.every(index=>{
            // for each one of the combination we need  to check if all of the indexes so essentially if all the values in our cell elements have the same class  
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function  setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }

}

// checking draw or win
function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText ='Draw!'

    }else{
        winningMessageTextElement.innerText=`${circleTurn ? "O's" : "X's"}Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    // destructuring cell elements into an array
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })

}







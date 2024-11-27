let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let result = document.querySelector(".result"); 
let msgBox = document.querySelector(".msg-container");
let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let gameDraw = () => {
    result.textContent = "GAME DRAW !";
    msgBox.classList.remove("hide");
    disableBoxes();
}

let disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

let enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
  
boxes.forEach(box => {
    box.addEventListener("click" , ()  => {
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true;
        count ++;

        let isWinner = checkWinner();

        if(count === 9 && !isWinner){
            gameDraw();
        }

    })
})


let checkWinner = () => {
    for(pattern of winPatterns){
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1 === val2 && val2 ===  val3){
                setWinColor([pattern[0] , pattern[1] , pattern[2]]);
                showWinner(val1);
                return true;
            }
        }
    }
}

const resetGame = () => {
    count = 0;
    turn0 = true;
    enableBoxes();
    msgBox.classList.add("hide");
    resetColor(boxes.length);
}


let showWinner = (winner) => {
    result.textContent= `Congratulations ! Player ${winner} is winner`;
    disableBoxes();
    msgBox.classList.remove("hide");
}

let setWinColor = (value) => {
    for(val of value){
        boxes[val].classList.toggle("win");
    }
}

let resetColor = (n) => {
    for(i=0 ; i<n ; i++){
        if(boxes[i].classList.contains("win")){
            boxes[i].classList.remove("win");
        }
    }
}

newGameBtn.addEventListener("click" , resetGame);
resetBtn.addEventListener("click" , resetGame);

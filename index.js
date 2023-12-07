
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer ;
let gameGrid ;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

//   function  which will show the default UI
  function initGame (){

    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");

    // showing in UI 
    //Need to update(make it empty) on UI also
    boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    /*remove the background color -- It also works
    box.classList.remove("win");*/

    //initialize the box with css properties again (adding existing classes)
    boxes[index].classList = `box box${index + 1}`;
  });

   

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

  }

  initGame();

//   swapping the turn
  function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

  }

//   logic of the game 
function checkGameOver() {
    let answer = "";
  
    winningPositions.forEach((position) => {
      //all 3 boxes should be non-empty and exactly same in value
      if (
        (gameGrid[position[0]] !== "" ||
          gameGrid[position[1]] !== "" ||
          gameGrid[position[2]] !== "") &&
        gameGrid[position[0]] === gameGrid[position[1]] &&
        gameGrid[position[1]] === gameGrid[position[2]]
      ) {
        //check If winner is X or Y
        if (gameGrid[position[0]] === "X") answer = "X";
        else answer = "O";
  
        //disable pointer events for all boxes (as we have found the winner)
        boxes.forEach((box) => {
          box.style.pointerEvents = "none";
        });
  
        //now we have found who is winner in which boxes
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
      }
    });
  
    //If we have found a winner
    if (answer !== "") {
      //show thw winner in paragraph
      gameInfo.innerText = `Winner Player - ${answer}`;
      //activate newGame button
      newGameBtn.classList.add("active");
      return;
    }
  
    //check weather there is a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
      if (box !== "") fillCount++;
    });
  
    //board is filled, game is tie
    if (fillCount === 9) {
      gameInfo.innerText = `Game Tied !`;
      newGameBtn.classList.add("active");
    }
  }

//   what happens when user clicks on the grid 
  function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText  = currentPlayer;
        gameGrid[index]  = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        // swap turn 
        swapTurn();

        // checking if anyone won the game 
        checkGameOver();
    }
  }

//   what to do when user has empty grid 
  boxes.forEach((box,index  ) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
  });

  newGameBtn.addEventListener('click',initGame);
import './style.css'
import $ from "jquery"


const app = {
  gameState: [
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]],

  originalGameState: [
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
    ["R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]],
  charPos: [14, 7],
  previousPosTerrain: "",
  charPosStart: [14, 7],
  carPos:[]
};

// const createRow=()=>{
//   const $row=$("<div>");
//   for (let i=0;i<app.gameState[0].length;i++){
//     $row.append($("<span>").text(app.gameState[0][i]));
//   }
//   $("#app").append($row);
// }


const ModToTerrain = (char) => {
  if (char === "X") {
    return $("<span>").text(char).addClass("grass");
  }
  if (char === "R") {
    return $("<span>").text(char).addClass("road");
  }
  if (char === "Y") {
    return $("<span>").text(char).attr("id", "player");
  }
  if (char === "C") {
    return $("<span>").text(char).addClass("car");
  }
}

//X->grass, R->road C->car Y-Character
const createMap = () => {
  $("#app").empty();
  for (let i = 0; i < app.gameState.length; i++) {
    const $row = $("<div>");
    for (let j = 0; j < app.gameState[i].length; j++) {
      // $row.append($("<span>").text(app.gameState[i][j]))
      $row.append(ModToTerrain(app.gameState[i][j]));
    }
    $("#app").append($row);
  }
  findCar();
  let x = 0;
  const gameOn=setInterval(()=>{
    x++;
  carMovement(x);
  },1);
}

const findCar = () => {
  for (let i = 0; i < app.gameState.length; i++) {
    for (let j = 0; j < app.gameState[i].length; j++) {
      if (app.gameState[i][j] === "C") {
        app.carPos.push([i, j]);
      }
    }
  }
}

const checkCollision = (newPos) => {
  if (newPos === "C" || newPos === "Y") {
    return "crash";
  }
}


const carMovement = (clock) => {

  if (clock % 100 === 0) {
    const newPos = app.carPos.map(
      (pos) => {
        if (pos[1] === app.gameState[pos[0]].length - 1) {
          return [pos[0], 0];
        }
        else {
          return [pos[0], pos[1]+1];
        }
      }
    )
    app.carPos=newPos;
    for (let i = 0; i < newPos.length; i++) {

      if (newPos[i][1] !== 0) {
        if(checkCollision(app.gameState[newPos[i][0]][newPos[i][1]])==="crash"){
          clearInterval(gameOn);
          startGame();
        }
        app.gameState[newPos[i][0]][newPos[i][1]] = "C";
        app.gameState[newPos[i][0]][newPos[i][1] - 1] = "R";
      }
      else {
        app.gameState[newPos[i][0]][newPos[i][1]] = "C";
        app.gameState[newPos[i][0]][app.gameState[newPos[i][0]].length - 1] = "R";
      }
      createMap();
    }
    
  }
}





const checkCondition = (row, column) => {
  //condition 1: at left boundary
  //condition 2: at right boundary
  //condition 3: at bottom boundary
  //condition 4: changing terrain

  if (column === 0) {
    return "left-bound";
  }

  else if (column === app.gameState[row].length - 1) {
    return "right-bound";
  }
  else if (row === app.gameState.length - 1) {
    return "bottom-bound";
  }

  else if (row === 0) {
    return "top-bound";
  }




}




const moveUp = (row, column) => {
  app.gameState[row][column] = app.previousPosTerrain;
  if (checkCollision(app.gameState[row - 1][column]) !== "crash") {
    app.previousPosTerrain = app.gameState[row - 1][column];
    app.gameState[row - 1][column] = "Y";
    app.charPos = [row - 1, column];
  }
  else startGame();
}

const moveLeft = (row, column) => {
  app.gameState[row][column] = app.previousPosTerrain;
  if (checkCollision(app.gameState[row][column - 1]) !== "crash") {
    app.previousPosTerrain = app.gameState[row][column - 1];
    app.gameState[row][column - 1] = "Y";
    app.charPos = [row, column - 1];
  }
  else startGame();
}

const moveRight = (row, column) => {
  app.gameState[row][column] = app.previousPosTerrain;
  if (checkCollision(app.gameState[row][column + 1]) !== "crash") {
    app.previousPosTerrain = app.gameState[row][column + 1];
    app.gameState[row][column + 1] = "Y";
    app.charPos = [row, column + 1];
  }
  else startGame();
}

const moveDown = (row, column) => {
  app.gameState[row][column] = app.previousPosTerrain;
  if (checkCollision(app.gameState[row + 1][column]) !== "crash") {
    app.previousPosTerrain = app.gameState[row + 1][column];
    app.gameState[row + 1][column] = "Y";
    app.charPos = [row + 1, column];
  }
  else startGame();
}


//top row is 0, bottom row is 16
//y coordinates, x coordinates
// const charStart=[app.gameState.length-1,Math.floor((app.gameState[0].length-1)/2)]
// let charPos=[app.gameState.length-1,Math.floor((app.gameState[0].length-1)/2)];

const moveCharacter = (event) => {
  const key = event.which;
  //KEYS: 37->left, 38->up, 39->right, 40->down
  const row = app.charPos[0];
  const column = app.charPos[1];
  const left = 97;
  const up = 119;
  const right = 100;
  const down = 115;

  // if (key===left && checkCondition(row,column)!=="left-bound"){
  // moveLeft(row,column);
  // }
  // else if (key===up && checkCondition(row,column)!=="top-bound"){
  // moveUp(row,column);
  // }
  // else if (key===right && checkCondition(row,column)!=="right-bound"){
  // moveRight(row,column);
  // }
  // else if (key===down &&  checkCondition(row,column)!=="bottom-bound"){
  // moveDown(row,column);
  // }
  if (key === left && checkCondition(row, column) !== "left-bound") {
    moveLeft(row, column);
  }
  else if (key === up && checkCondition(row, column) !== "top-bound") {
    moveUp(row, column);
  }
  else if (key === right && checkCondition(row, column) !== "right-bound") {
    moveRight(row, column);
  }
  else if (key === down && checkCondition(row, column) !== "bottom-bound") {
    moveDown(row, column);
  }


  createMap();
}

const startGame = () => {
  $("#app").empty();
  app.gameState = [...app.originalGameState];
  app.charPos = app.charPosStart;
  app.previousPosTerrain = "G";
  app.gameState[app.charPos[0]][app.charPos[1]] = "Y";
  createMap();
}

let gameOn;

$(() => {
  // createRow();
  createMap();
  
  console.log(app.charPos);
  app.charPos = [app.gameState.length - 1, Math.floor((app.gameState[0].length - 1) / 2)];
  console.log("after", app.charPos);
  $(document).on("keypress", moveCharacter);
  startGame();
$("#app").hide();

})
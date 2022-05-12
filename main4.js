import './style.css'
import $ from "jquery"

const inputPlayerName=()=>{
    $("#app").append($("<div>").attr("id","frontpage"));
    const $playerName=$("<div>").text("Enter your name: ")
    $("#frontpage").append($playerName).append($("<input>").attr("placeholder","Player Name"));
    $("#frontpage").append($("<button>").attr("id","start").text("Hit button to start crossing the road"));
    $("button").on("click",frontPageToGame);
}
const app = {
  
    originalGameState: [
      ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
      ["RC", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "R", "R", "RC", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["X", "X", "O", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "O", "X", "O", "O", "X", "X", "X", "X", "X", "X", "X"],
      ["R", "R", "R", "C", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "RC", "R", "R"],
      ["R", "R", "R", "R", "R", "R", "RC", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R"],
      ["X", "X", "X", "X", "O", "O", "O", "X", "O", "X", "O", "O", "X", "X", "X"],
      ["R", "R", "R", "R", "R", "RC", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "C", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R"],
      ["X", "X", "X", "X", "X", "X", "O", "X", "X", "O", "X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]],
      gameState: [],
    charPos: [],
    previousPosTerrain: "",
    charPosStart: [14, 7],
    carPos:[],
    reversecarPos:[],
    lives:3,
    gameSpeed:1000,
    gameSpeedLevels:[1000,50,30,20,10,1],
    level:1
  };


// const ModToTerrain = (char) => {
//     if (char === "X") {
//       return $("<span>").text(char).addClass("grass").attr("img","");
//     }
//     if (char === "R") {
//       return $("<span>").text(char).addClass("road").attr("img","");
//     }
//     if (char === "Y") {
//       return $("<span>").text(char).attr("id", "player").attr("img","");
//     }
//     if (char === "C") {
//       return $("<span>").text(char).addClass("car").attr("img","");
//     }
//     if (char === "E") {
//       return $("<span>").text(char).addClass("end").attr("img","portal.jpeg");
//     }
//   }
  const ModToTerrain = (char) => {
    if (char === "X") {
      return $("<img>").addClass("grass").attr("src","grass.jpeg");
    }
    if (char === "R") {
      return $("<img>").addClass("road").attr("src","road.jpeg");
    }
    if (char === "Y") {
      return $("<img>").attr("id", "player").attr("src","char.jpeg");
    }
    if (char === "C") {
      return $("<img>").addClass("car").attr("src","car.jpeg");
    }
    if (char === "E") {
      return $("<img>").addClass("end").attr("src","portal.jpeg");
    }
    if (char === "RC") {
        return $("<img>").addClass("reversecar").attr("src","reversecar.jpeg");
      }
      if (char === "O") {
        return $("<img>").addClass("obstacle").attr("src","obstacle.png");
      }
  }

//X->grass, R->road C->car Y-Character
const createMap = () => {
    $("#app").empty();
    console.log(app.level);
    console.log(app.lives);
    const $lives=$("<div>").text("lives remaining: "+app.lives).attr("id","lives");
    const $level=$("<div>").text("level: " +app.level).attr("id","level");
    const $div=$("<div>").attr("id","gamestatus").append($level).append($lives);
    $("#app").append($div);
    for (let i = 0; i < app.gameState.length; i++) {
      const $row = $("<div>").addClass("row"+i);
      for (let j = 0; j < app.gameState[i].length; j++) {
        // $row.append($("<span>").text(app.gameState[i][j]))
        $row.append(ModToTerrain(app.gameState[i][j]));
      }
      $("#app").append($row);
    }
  }
const gameToHighscore=()=>{
    $("#app").hide();
    highscore();
}

const highscoreToMainPage=()=>{
    $("#endgame").hide();
    $("#app").show();
    startGame();
    createMap();
}

const highscore=()=>{
    const $endgame=$("<div>").attr("id","endgame").text("GAME OVER, you reached level "+app.level).css({"font-size":"100px"});
  $("body").append($endgame);
  $("#endgame").append($("<button>").text("Try again").attr("id","tryagain"));
    $("#tryagain").on("click", highscoreToMainPage);

}


const restartGame=()=>{
clearInterval(gameOn);
app.lives--;
if (app.lives===0){
  gameToHighscore();
}
$("#app").empty();
  app.gameState = [...app.originalGameState];
  app.charPos = app.charPosStart;
  app.previousPosTerrain = "G";
  app.gameState[app.charPos[0]][app.charPos[1]] = "Y";
  createMap();

}
const levelUp=()=>{
  clearInterval(gameOn);
  console.log("level up");
  app.level++;
  console.log(app.level);
  $("#app").empty();
  app.gameState = [...app.originalGameState];
  app.charPos = app.charPosStart;
  app.previousPosTerrain = "G";
  app.gameState[app.charPos[0]][app.charPos[1]] = "Y";
  app.gameSpeed=app.gameSpeedLevels[app.level-1];
  console.log(app.gameSpeed);
  createMap();
  setInterval(gameOn);
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
  const findReverseCar = () => {
    for (let i = 0; i < app.gameState.length; i++) {
      for (let j = 0; j < app.gameState[i].length; j++) {
        if (app.gameState[i][j] === "RC") {
          app.reversecarPos.push([i, j]);
        }
      }
    }
  }
  const checkCollision = (newPos) => {
    if (newPos === "C" || newPos === "Y" ||newPos==="RC") {
      return "crash";
    }
  }

  const checkEnd=(newPos)=>{
    if(newPos==="E"){
      return "level-up";
    }
  }


  const carMovement = (clock, gameSpeed) => {

    if (clock % gameSpeed === 0) {
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
            restartGame();
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
  const reversecarMovement = (clock, gameSpeed) => {

    if (clock % gameSpeed === 0) {
      const newPos = app.reversecarPos.map(
        (pos) => {
          if (pos[1] === 0) {
            return [pos[0], app.gameState[pos[0]].length-1];
          }
          else {
            return [pos[0], pos[1]-1];
          }
        }
      )
      app.reversecarPos=newPos;
      for (let i = 0; i < newPos.length; i++) {
  
        if (newPos[i][1] !== app.gameState[newPos[i][0]].length-1) {
          if(checkCollision(app.gameState[newPos[i][0]][newPos[i][1]])==="crash"){
            restartGame();
          }
          app.gameState[newPos[i][0]][newPos[i][1]] = "RC";
          app.gameState[newPos[i][0]][newPos[i][1] + 1] = "R";
        }
        else {
          app.gameState[newPos[i][0]][newPos[i][1]] = "RC";
          app.gameState[newPos[i][0]][0] = "R";
        }
        createMap();
      }
      
    }
  }

  const moveUp = (row, column) => {
    app.gameState[row][column] = app.previousPosTerrain;
    if (checkEnd(app.gameState[row-1][column])==="level-up"){
      console.log("im in");
      levelUp();
    }
    else if (checkCollision(app.gameState[row - 1][column]) !== "crash") {
      app.previousPosTerrain = app.gameState[row - 1][column];
      app.gameState[row - 1][column] = "Y";
      app.charPos = [row - 1, column];
    }

    else restartGame();
  }
  
  const moveLeft = (row, column) => {
    app.gameState[row][column] = app.previousPosTerrain;
    if (checkEnd(app.gameState[row][column - 1])==="level-up"){
      levelUp();
    }
    else if (checkCollision(app.gameState[row][column - 1]) !== "crash") {
      app.previousPosTerrain = app.gameState[row][column - 1];
      app.gameState[row][column - 1] = "Y";
      app.charPos = [row, column - 1];
    }

    else restartGame();
  }
  
  const moveRight = (row, column) => {
    app.gameState[row][column] = app.previousPosTerrain;
    if (checkEnd(app.gameState[row][column + 1])==="level-up"){
      levelUp();
    }
    else if (checkCollision(app.gameState[row][column + 1]) !== "crash") {
      app.previousPosTerrain = app.gameState[row][column + 1];
      app.gameState[row][column + 1] = "Y";
      app.charPos = [row, column + 1];
    }

    else restartGame();
  }
  
  const moveDown = (row, column) => {
    app.gameState[row][column] = app.previousPosTerrain;
    if (checkCollision(app.gameState[row + 1][column]) !== "crash") {
      app.previousPosTerrain = app.gameState[row + 1][column];
      app.gameState[row + 1][column] = "Y";
      app.charPos = [row + 1, column];
    }
    else restartGame();
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
    else if (app.gameState[row][column]==="O"){
        console.log(app.gameState[row][column]);
        return "obstacle";
    }
  }

  const moveCharacter = (event) => {
    const key = event.which;
    //KEYS: 37->left, 38->up, 39->right, 40->down
    const row = app.charPos[0];
    const column = app.charPos[1];
    const left = 97;
    const up = 119;
    const right = 100;
    const down = 115;
  
    if (key === left && checkCondition(row, column) !== "left-bound" && checkCondition(row,column-1)!=="obstacle") {
      moveLeft(row, column);
    }
    else if (key === up && checkCondition(row, column) !== "top-bound" && checkCondition(row-1,column)!=="obstacle") {
      moveUp(row, column);
    }
    else if (key === right && checkCondition(row, column) !== "right-bound" && checkCondition(row,column+1)!=="obstacle") {
      moveRight(row, column);
    }
    else if (key === down && checkCondition(row, column) !== "bottom-bound" && checkCondition(row+1,column)!=="obstacle") {
      moveDown(row, column);
    }
    createMap();
  }

let gameOn;

const startGame=()=>{
    app.gameState=[...app.originalGameState];
    app.charPos = [...app.charPosStart];
    app.level=1;
    app.previousPosTerrain = "G";
    app.gameState[app.charPos[0]][app.charPos[1]] = "Y";
    const gameOn=setInterval(()=>{
        x++;
        carMovement(x,app.gameSpeed);
        reversecarMovement(x,app.gameSpeed);
        },1);
    createMap();
    findCar();
    findReverseCar();
    let x = 0;
    $(document).on("keypress", moveCharacter);
}

const frontPageToGame=()=>{
    $("#frontpage").hide("slow");
    startGame();
}




$(()=>{
    inputPlayerName();

})
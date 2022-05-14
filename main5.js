import './style.css'
import $ from "jquery"
import grass from './grass.jpeg'
import road from './road.jpeg'
import player from './char.jpeg'
import car from './car.jpeg'
import end from './portal.jpeg'
import reversecar from './reversecar.jpeg'
import obstacle from './obstacle.png'

// const ModToTerrain = (char) => {
//   if (char === "X") {
//     return $("<img>").addClass("grass").attr("src",grass);
//   }
//   if (char === "R") {
//     return $("<img>").addClass("road").attr("src",road);
//   }
//   if (char === "Y") {
//     return $("<img>").attr("id", "player").attr("src",player);
//   }
//   if (char === "C") {
//     return $("<img>").addClass("car").attr("src",car);
//   }
//   if (char === "E") {
//     return $("<img>").addClass("end").attr("src",end);
//   }
//   if (char === "RC") {
//       return $("<img>").addClass("reversecar").attr("src",reversecar);
//     }
//     if (char === "O") {
//       return $("<img>").addClass("obstacle").attr("src",obstacle);
//     }
// }

const inputPlayerName=()=>{
    $("#app").hide();
  console.log("start page");
    $("body").append($("<div>").attr("id","frontpage"));
    const $playerName=$("<div>").text("Enter your name: ");
    $("#frontpage").append($playerName).append($("<input>").attr("placeholder","Player Name"));
    $("#frontpage").append($("<button>").attr("id","start").text("Hit button to start crossing the road"));
    $("#frontpage").append($("<img>").attr("src","crossyroad.jpeg").attr("id","crossyroad"));
    $("button").on("click",frontPageToGame).attr("id","frontpagebutton");
}
const app = {
  
    originalGameState: [
      ["E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E"],
      ["RC", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "R", "R", "RC", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "C", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["X", "X", "O", "X", "X", "X", "X", "X", "X", "X", "O", "X", "O", "X", "O"],
      ["X", "X", "X", "X", "O", "X", "O", "O", "O", "O", "X", "X", "X", "X", "X"],
      ["R", "R", "R", "C", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "RC", "R", "R"],
      ["R", "R", "R", "R", "R", "R", "RC", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "C", "R", "R", "R", "R"],
      ["O", "O", "O", "O", "O", "O", "O", "X", "O", "X", "O", "O", "X", "X", "X"],
      ["R", "R", "R", "R", "R", "RC", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
      ["R", "R", "R", "C", "R", "R", "R", "R", "C", "R", "R", "R", "R", "R", "R"],
      ["X", "X", "X", "X", "X", "X", "O", "O", "O", "O", "O", "O", "O", "O", "O"],
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]],
      gameState: [],
    charPos: [],
    previousPosTerrain: "",
    charPosStart: [14, 7],
    carPos:[],
    reversecarPos:[],
    lives:3,
    gameSpeed:100,
    gameSpeedLevels:[100,50,30,20,10,1,0.5,0.01,0.001],
    level:1,
    gameOver: new Audio("car-crash-sound-effect_5tCU2cAR.mp3")
  };
const randomMapGen=()=>{

}

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
    return $("<img>").addClass("grass").attr("src",grass);
  }
  if (char === "R") {
    return $("<img>").addClass("road").attr("src",road);
  }
  if (char === "Y") {
    return $("<img>").attr("id", "player").attr("src",player);
  }
  if (char === "C") {
    return $("<img>").addClass("car").attr("src",car);
  }
  if (char === "E") {
    return $("<img>").addClass("end").attr("src",end);
  }
  if (char === "RC") {
      return $("<img>").addClass("reversecar").attr("src",reversecar);
    }
    if (char === "O") {
      return $("<img>").addClass("obstacle").attr("src",obstacle);
    }
}
  // const ModToTerrain = (char) => {
  //   if (char === "X") {
  //     return $("<img>").addClass("grass").attr("src","grass.jpeg");
  //   }
  //   if (char === "R") {
  //     return $("<img>").addClass("road").attr("src","road.jpeg");
  //   }
  //   if (char === "Y") {
  //     return $("<img>").attr("id", "player").attr("src","char.jpeg");
  //   }
  //   if (char === "C") {
  //     return $("<img>").addClass("car").attr("src","car.jpeg");
  //   }
  //   if (char === "E") {
  //     return $("<img>").addClass("end").attr("src","portal.jpeg");
  //   }
  //   if (char === "RC") {
  //       return $("<img>").addClass("reversecar").attr("src","reversecar.jpeg");
  //     }
  //     if (char === "O") {
  //       return $("<img>").addClass("obstacle").attr("src","obstacle.png");
  //     }
  // }

//X->grass, R->road C->car Y-Character
const createMap = () => {
    $("#app").empty();
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
   $("body").empty();
   console.log(app.lives,"highscoretomainpage");
   $("body").append($("<div>").attr("id","app"));
    inputPlayerName();
}

const highscore=()=>{
    if(localStorage.getItem("highscore")===null ||localStorage.getItem("highscore")[0]<app.level){
    localStorage.setItem("highscore", [app.level,app.playername]);
    }
    const $endgame=$("<div>").attr("id","endgame").text("You reached level "+app.level+"!!!!! "+"Highest score is "+ localStorage.getItem("highscore")[0]+" by "+localStorage.getItem("highscore")[1]).css({"font-size":"30px"});
  $("body").append($("<img>").attr("src","gameover.png").attr("id","gameover")).append($endgame);
  $("#endgame").append($("<button>").text("Try again").attr("id","tryagain"));
    $("#tryagain").on("click", highscoreToMainPage);

}


const restartGame=()=>{
// clearInterval(gameOn);
// app.gameOver.play();
console.log("deduct lives");
app.lives--;
if (app.lives===0){
    console.log(app.lives);
  clearInterval(gameOn);
  gameToHighscore();
}
else{
    console.log(app.lives);
$("#app").empty();
  app.gameState = [...app.originalGameState];
  console.log("after restart",app.originalGameState);
  app.charPos = app.charPosStart;
  app.previousPosTerrain = "X";
  app.gameState[app.charPos[0]][app.charPos[1]] = "Y";
  createMap();
}

}
const levelUp=()=>{
  console.log("level up");
  app.level++;
  $("#app").empty();
  app.gameState = [...app.originalGameState];
  app.charPos = app.charPosStart;
  app.previousPosTerrain = "G";
  app.gameState[app.charPos[0]][app.charPos[1]] = "Y";
  app.gameSpeed=app.gameSpeedLevels[app.level-1];
  createMap();
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
  const checkHumanCollision = (newPos) => {
    if (newPos === "Y") {
        console.log("newPos:",newPos);
      return "crash";
    }
  }

  const checkCollision = (newPos) => {
    if (newPos === "C" ||newPos==="RC") {
        console.log("newPos:",newPos);
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
      app.carPos=[...newPos];
      console.log(app.carPos);
      console.log(newPos);
      for (let i = 0; i < newPos.length; i++) {
  
        if (newPos[i][1] !== 0) {
          if(checkHumanCollision(app.gameState[newPos[i][0]][newPos[i][1]])==="crash"){
              console.log("crash by car");
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
      app.reversecarPos=[...newPos];
      for (let i = 0; i < app.reversecarPos.length; i++) {
  
        if (app.reversecarPos[i][1] !== app.gameState[app.reversecarPos[i][0]].length-1) {
          if(checkHumanCollision(app.gameState[app.reversecarPos[i][0]][app.reversecarPos[i][1]])==="crash"){
              console.log("crash by RC");
            restartGame();
          }
          app.gameState[app.reversecarPos[i][0]][app.reversecarPos[i][1]] = "RC";
          app.gameState[app.reversecarPos[i][0]][app.reversecarPos[i][1] + 1] = "R";
        }
        else {
          app.gameState[app.reversecarPos[i][0]][app.reversecarPos[i][1]] = "RC";
          app.gameState[app.reversecarPos[i][0]][0] = "R";
        }
        createMap();
      }
      
    }
  }

  const moveUp = (row, column) => {
    app.gameState[row][column] = app.previousPosTerrain;
    if (checkEnd(app.gameState[row-1][column])==="level-up"){
      levelUp();
    }
    else if (checkCollision(app.gameState[row - 1][column]) !== "crash") {
      app.previousPosTerrain = app.gameState[row - 1][column];
      app.gameState[row - 1][column] = "Y";
      app.charPos = [row - 1, column];
    }

    else{ 
        console.log("player hits car");
        restartGame(); 
    }
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

    else{ 
        console.log("player hits car");
        restartGame(); 
    }
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

    else{ 
        console.log("player hits car");
        restartGame(); 
    }
  }
  
  const moveDown = (row, column) => {
    app.gameState[row][column] = app.previousPosTerrain;
    if (checkCollision(app.gameState[row + 1][column]) !== "crash") {
      app.previousPosTerrain = app.gameState[row + 1][column];
      app.gameState[row + 1][column] = "Y";
      app.charPos = [row + 1, column];
    }
    else{ 
        console.log("player hits car");
        restartGame(); 
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
  console.log("start game");
  console.log(app.originalGameState);
    app.gameState=[...app.originalGameState];
    app.charPos = [...app.charPosStart];
    console.log(app.lives);
    app.lives=3;
    app.level=1;
    app.previousPosTerrain = "X";
    app.gameState[app.charPos[0]][app.charPos[1]] = "Y";
    findCar();
    findReverseCar();
    let x = 0;
    gameOn=setInterval(()=>{
        x++;
        carMovement(x,app.gameSpeed);
        reversecarMovement(x,app.gameSpeed);
        },1);
    // createMap();
    
  
    
}

const frontPageToGame=()=>{
  console.log("2");
 app.playername=$("input").val();
    $("#frontpage").hide("slow");
    $("#app").show();
    startGame();
}




$(()=>{
    inputPlayerName();
    $(document).on("keypress", moveCharacter);
})
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

//event listener
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);


function onKeyDown(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 68: //d
      keyD = true;
      break;
    case 83: //s
      keyS = true;
      break;
    case 65: //a
      keyA = true;
      break;
    case 87: //w
      keyW = true;
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 68: //d
      keyD = false;
      break;
    case 83: //s
      keyS = false;
      break;
    case 65: //a
      keyA = false;
      break;
    case 87: //w
      keyW = false;
      break;
  }
}

//neccessary variables
var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;

let intervalID;
const moveInterval = 50;

function enableMovement() {
    intervalID =  setInterval(checkMovement, moveInterval);
}

function disableMovement() {
    if(intervalID)
        clearInterval(intervalID);
}

//main animation function
function checkMovement() {
    if(keyW)
        world.moveHero(myHero, DirEnum.UP);

    if(keyA)
        world.moveHero(myHero, DirEnum.LEFT);

    if(keyS)
        world.moveHero(myHero, DirEnum.DOWN);

    if(keyD)
        world.moveHero(myHero, DirEnum.RIGHT);        
}

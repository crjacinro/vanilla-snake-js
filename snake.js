const DEFAULT_SNAKE_SIZE = 5;

let gameCanvas;
let gameContext;

let snakeHeadX = 10;
let snakeHeadY = 10;

let gridSize = 20;
let tileCount = 20;

let applePositionX = 15;
let applePositionY = 15;

let snakeDirectionX = 0;
let snakeDirectionY = 0;

let snakeBody = [];
let snakeSize = DEFAULT_SNAKE_SIZE;

window.onload = function () {
  initializeUi();
  setListeners();
  setInterval(game, 1000 / 15);
};

function initializeUi() {
  gameCanvas = document.getElementById("gc");
  gameContext = gameCanvas.getContext("2d");
}

function setListeners() {
  document.addEventListener("keydown", keyPush);
}

function game() {
  // Move the snake's head to the current direction
  snakeHeadX += snakeDirectionX;
  snakeHeadY += snakeDirectionY;

  // If snake's head hit the wall, continue on the opposite side of the wall.
  if (snakeHeadX < 0) {
    snakeHeadX = tileCount - 1;
  }
  if (snakeHeadX > tileCount - 1) {
    snakeHeadX = 0;
  }
  if (snakeHeadY < 0) {
    snakeHeadY = tileCount - 1;
  }
  if (snakeHeadY > tileCount - 1) {
    snakeHeadY = 0;
  }

  // Refresh the entire canvas to black
  gameContext.fillStyle = "black";
  gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Draw the snake's body
  gameContext.fillStyle = "lime";
  for (var i = 0; i < snakeBody.length; i++) {
    gameContext.fillRect(
      snakeBody[i].x * gridSize,
      snakeBody[i].y * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    // If the snake hits its own body, set the snake size back to its default.
    if (snakeBody[i].x == snakeHeadX && snakeBody[i].y == snakeHeadY) {
      snakeSize = DEFAULT_SNAKE_SIZE;
    }
  }

  // Update snake body ????
  snakeBody.push({ x: snakeHeadX, y: snakeHeadY });
  while (snakeBody.length > snakeSize) {
    snakeBody.shift();
  }

  // If snake eats an apple, increment snake size and move apple to other random position
  if (applePositionX == snakeHeadX && applePositionY == snakeHeadY) {
    snakeSize++;
    applePositionX = Math.floor(Math.random() * tileCount);
    applePositionY = Math.floor(Math.random() * tileCount);
  }

  // Draw the apple
  gameContext.fillStyle = "red";
  gameContext.fillRect(
    applePositionX * gridSize,
    applePositionY * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

// Handle keyboard navigation
function keyPush(evt) {
  switch (evt.keyCode) {
    case 37: // Move left
      snakeDirectionX = -1;
      snakeDirectionY = 0;
      break;
    case 38: // Move Down
      snakeDirectionX = 0;
      snakeDirectionY = -1;
      break;
    case 39: // Move Right
      snakeDirectionX = 1;
      snakeDirectionY = 0;
      break;
    case 40: // Move Up
      snakeDirectionX = 0;
      snakeDirectionY = 1;
      break;
  }
}

import Background from '../public/background';
import characterWalk from './assets/characterWalk.png';

import './index.scss';

const background = new Background();
background.init();

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 48;

const shots = 3;
let cycle = 0;

let bottomPressed = false;
let direction = '';

const canvasSize = 600;
const picSize = 48;

const centralPos = canvasSize / 2 - picSize / 2;

let pX = centralPos;
let pY = centralPos;
let walkPic = 0;

const img = document.createElement('img');
img.src = characterWalk;

function keyDownHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = true;
    direction = 'down';
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    bottomPressed = true;
    direction = 'up';
  } else if (e.key === 'Right' || e.key === 'ArrowRight') {
    bottomPressed = true;
    direction = 'right';
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    bottomPressed = true;
    direction = 'left';
  }
}

function keyUpHandler(e) {
  if (e.key === 'Down' || e.key === 'ArrowDown') {
    bottomPressed = false;
    direction = '';
  } else if (e.key === 'Up' || e.key === 'ArrowUp') {
    bottomPressed = false;
    direction = '';
  } else if (e.key === 'Right' || e.key === 'ArrowRight') {
    bottomPressed = false;
    direction = '';
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    bottomPressed = false;
    direction = '';
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const getDirection = () => {
  if (!bottomPressed) {
    return { pX, pY };
  }

  const moveRange = 10;

  switch (direction) {
    case 'down':
      if (pY >= canvasSize - (picSize + moveRange)) {
        break;
      }

      pY += moveRange;
      walkPic = 0;
      break;
    case 'up':
      if (pY <= 0) {
        break;
      }

      pY -= moveRange;
      walkPic = 144;
      break;
    case 'right':
      if (pX >= canvasSize - picSize) {
        break;
      }

      pX += moveRange;
      walkPic = 96;
      break;
    case 'left':
      if (pX <= 0) {
        break;
      }

      pX -= moveRange;
      walkPic = 48;
      break;
    default:
      return { pX, pY, walkPic };
  }

  cycle = (cycle + 1) % shots;

  return { pX, pY, walkPic };
};

const drawImage = (xPos, yPos, walkPos = 0) => {
  ctx.clearRect(0, 0, 600, 600);
  ctx.drawImage(img, cycle * spriteW, walkPos, spriteW, spriteH, xPos, yPos, 48, 48);
};

img.addEventListener('load', () => {
  setInterval(() => {
    const { pX: xPos, pY: yPos, walkPic: walkPos } = getDirection();

    drawImage(xPos, yPos, walkPos);
  }, 120);
});

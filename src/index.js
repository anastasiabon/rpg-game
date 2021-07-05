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

let buttonPressed = null;

const picSize = 48;

const centralPos = canvas.width / 2 - picSize / 2;

let pX = centralPos;
let pY = centralPos;
let walkPic = 0;

const img = document.createElement('img');
img.src = characterWalk;

function keyDownHandler(e) {
  if (
    e.key === 'Down' || 'ArrowDown' || 'Up' || 'ArrowUp' || 'Right' || 'ArrowRight' || 'Left' || 'ArrowLeft'
  ) {
    buttonPressed = e.key;
  }
}

function keyUpHandler(e) {
  if (
    e.key === 'Down' || 'ArrowDown' || 'Up' || 'ArrowUp' || 'Right' || 'ArrowRight' || 'Left' || 'ArrowLeft'
  ) {
    buttonPressed = null;
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const getDirection = () => {
  if (!buttonPressed) {
    return { pX, pY };
  }

  const moveRange = 10;

  switch (buttonPressed) {
    case 'ArrowDown':
      if (pY >= canvas.height - (picSize + moveRange)) {
        break;
      }

      pY += moveRange;
      walkPic = 0;
      break;
    case 'ArrowUp':
      if (pY <= 0) {
        break;
      }

      pY -= moveRange;
      walkPic = picSize * 3;
      break;
    case 'ArrowRight':
      if (pX >= canvas.width - picSize) {
        break;
      }

      pX += moveRange;
      walkPic = picSize * 2;
      break;
    case 'ArrowLeft':
      if (pX <= 0) {
        break;
      }

      pX -= moveRange;
      walkPic = picSize;
      break;
    default:
      return { pX, pY, walkPic };
  }

  cycle = (cycle + 1) % shots;

  return { pX, pY, walkPic };
};

const drawImage = (xPos, yPos, walkPos = 0) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, cycle * spriteW, walkPos, spriteW, spriteH, xPos, yPos, picSize, picSize);
};

img.addEventListener('load', () => {
  setInterval(() => {
    const { pX: xPos, pY: yPos, walkPic: walkPos } = getDirection();

    drawImage(xPos, yPos, walkPos);
  }, 120);
});

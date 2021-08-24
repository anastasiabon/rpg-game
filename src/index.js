import { io } from 'socket.io-client';
import ClientGame from './client/ClientGame';
import './index.scss';
import {getTime} from "./common/util";

window.addEventListener('load', () => {
  const socket = io('https://jsprochat.herokuapp.com');

  const $startGameBlock = document.querySelector('.start-game');
  const $formName = document.getElementById('nameForm');
  const $inputName = document.getElementById('name');

  const $chatWrap = document.querySelector('.chat-wrap');
  const $form = document.getElementById('form');
  const $input = document.getElementById('input');
  const $message = document.querySelector('.message');

  const submitName = (e) => {
    e.preventDefault();

    if ($inputName.value) {
      ClientGame.game = new ClientGame({
        tagId: 'game',
        playerName: $inputName.value,
      });
      socket.emit('start', $inputName.value);

      $chatWrap.style.display = 'block';

      $formName.removeEventListener('submit', submitName);
      $startGameBlock.remove();
    }
  }

  $formName.addEventListener('submit', submitName);

  $form.addEventListener('submit', (e) => {
    e.preventDefault();

    if ($input.value) {
      socket.emit('chat message', $input.value);

      $input.value = '';
    }
  })

  socket.on('chat connection', (data) => {
    $message.insertAdjacentHTML('beforeend',
      `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`)
  });

  socket.on('chat disconnection', (data) => {
    $message.insertAdjacentHTML('beforeend',
      `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`)
  });

  socket.on('chat message', (data) => {
    $message.insertAdjacentHTML('beforeend',
      `<p><strong>${getTime(data.time)}</strong> - ${data.msg}</p>`)
  });
});


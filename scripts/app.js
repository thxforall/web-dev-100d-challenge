let editedPlayer = 0;

const players = [
  {
    name: '',
    symbol: 'X',
  },
  {
    name: '',
    symbol: 'O',
  },
];

const playerConfigOverlayElement =
  document.getElementsByClassName('config-overlay')[0];
const backdropElement = document.getElementsByClassName('backdrop')[0];
const formElement = document.querySelector('form');
const errorsOutputElement = document.getElementsByClassName('config-errors')[0];

const editPlayer1BtnElement =
  document.getElementsByClassName('edit-player-1-btn')[0];
const editPlayer2BtnElement =
  document.getElementsByClassName('edit-player-2-btn')[0];
const cancleConfigBtnElement =
  document.getElementsByClassName('cancel-config-btn')[0];

editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

cancleConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

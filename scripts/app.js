const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;

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
const gameAreaElement = document.getElementsByClassName('active-game')[0];
const activePlayerNameElement =
  document.getElementsByClassName('active-player-name')[0];
// const gameFieldElements = document.querySelectorAll('.game-board li');
const gameBoardElement = document.getElementsByClassName('game-board')[0];

const editPlayer1BtnElement =
  document.getElementsByClassName('edit-player-1-btn')[0];
const editPlayer2BtnElement =
  document.getElementsByClassName('edit-player-2-btn')[0];
const cancleConfigBtnElement =
  document.getElementsByClassName('cancel-config-btn')[0];
const startNewGameBtnElement =
  document.getElementsByClassName('start-game-btn')[0];

editPlayer1BtnElement.addEventListener('click', openPlayerConfig);
editPlayer2BtnElement.addEventListener('click', openPlayerConfig);

cancleConfigBtnElement.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startNewGameBtnElement.addEventListener('click', startNewGame);

// for (const gameFieldElement of gameFieldElements) {
//   gameFieldElement.addEventListener('click', selectGameField);
// }

gameBoardElement.addEventListener('click', selectGameField);

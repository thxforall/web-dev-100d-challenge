const btnCalculateSumElement = document.getElementById('btn-calculate-sum');

function handlerBtnCalculateSum() {
  const inputUserNumberElement = document.getElementById('user-number');
  const inputUserNumber = inputUserNumberElement.value;

  let resultCalculateSumNum = 0;

  for (let i = 0; i <= inputUserNumber; i++) {
    resultCalculateSumNum += i;
  }

  const resultCalculateSumElement = document.getElementById('calculated-sum');

  resultCalculateSumElement.textContent = resultCalculateSumNum;
  resultCalculateSumElement.style.display = 'block';
}

btnCalculateSumElement.addEventListener('click', handlerBtnCalculateSum);

const linkChangeBtn = document.getElementById('linkChangeBtn');

function linkChangeHandler() {
  const aLinks = document.querySelectorAll('a');

  for (const link of aLinks) {
    link.classList.add('highlight');
  }
}

linkChangeBtn.addEventListener('click', linkChangeHandler);

const userDataInputBtn = document.getElementById('user-data-input');
const userData = {
  Name: 'Kiyori',
  Age: 29,
  IsAdmin: true,
};

function outputUserDataHandler() {
  const userDataList = document.getElementById('output-user-data');
  userDataList.innerText = '';

  for (const propertyName in userData) {
    const liElement = document.createElement('li');
    const outputText =
      propertyName.toUpperCase() + ': ' + userData[propertyName];
    liElement.textContent = outputText;
    userDataList.appendChild(liElement);
  }
}

userDataInputBtn.addEventListener('click', outputUserDataHandler);

const rollDiceButtonElement = document.querySelector('#statistics button');

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function deriveNumberOfDiceRolls() {
  const targetNumberInputElement =
    document.getElementById('user-target-number');
  const diceRollsListElement = document.getElementById('dice-rolls');
  const enteredNumber = +targetNumberInputElement.value;
  diceRollsListElement.innerText = '';

  let hasRolledTargetNumber = false;
  let numberOfRolls = 0;

  while (!hasRolledTargetNumber) {
    const rolledNumber = rollDice();
    // if (rolledNumber == enteredNumber) {
    //   hasRolledTargetNumber = true;
    // }
    numberOfRolls++;
    const newRollListItemElement = document.createElement('li');
    const outputText = 'Roll ' + numberOfRolls + ': ' + rolledNumber;
    newRollListItemElement.textContent = outputText;
    diceRollsListElement.append(newRollListItemElement);
    hasRolledTargetNumber = rolledNumber == enteredNumber;
  }

  const outputTotalRollsElement = document.getElementById('output-total-rolls');
  const outputTargetNumberElement = document.getElementById(
    'output-target-number'
  );

  outputTargetNumberElement.textContent = enteredNumber;
  outputTotalRollsElement.textContent = numberOfRolls;
}

rollDiceButtonElement.addEventListener('click', deriveNumberOfDiceRolls);

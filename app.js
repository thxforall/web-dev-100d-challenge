const inputUserNumberElement = document.getElementById('user-number');
const btnCalculateSumElement = document.getElementById('btn-calculate-sum');
const resultCalculateSumElement = document.getElementById('calculated-sum');

let resultCalculateSumNum = 0;

function getUserNumberInput() {
  return parseInt(inputUserNumberElement.value);
}

function handlerBtnCalculateSum() {
  if (inputUserNumberElement.value) {
    resultCalculateSumNum += getUserNumberInput();
    resultCalculateSumElement.textContent = resultCalculateSumNum;
    resultCalculateSumElement.style.display = 'block';
  }
}

btnCalculateSumElement.addEventListener('click', handlerBtnCalculateSum);

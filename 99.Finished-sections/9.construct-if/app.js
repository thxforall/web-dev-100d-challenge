const productNameInputElement = document.getElementById('product-name');
const inputLength = document.getElementById('input-length');
const maxLength = productNameInputElement.maxLength;

function countInputLength(event) {
  const inputText = event.target.value;
  const inputTextLength = inputText.length;

  const remainingCharacters = maxLength - inputTextLength;
  inputLength.textContent = remainingCharacters;

  if (remainingCharacters === 0) {
    inputLength.classList.add('error');
    productNameInputElement.classList.add('error');
  } else if (remainingCharacters <= 10) {
    inputLength.classList.add('warning');
    productNameInputElement.classList.add('warning');
    inputLength.classList.remove('error');
    productNameInputElement.classList.remove('error');
  } else {
    inputLength.classList.remove('warning');
    productNameInputElement.classList.remove('warning');
  }
}

productNameInputElement.addEventListener('input', countInputLength);
